import { NavbarService } from './../components/navbar/navbar.service';
import { SendMessageService } from "./../send-message/send-message.service";
import { ForwardMessageService } from "./forward-message.service";
import { AuthService } from "./../auth/auth.service";
import { element } from "protractor";

import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  Inject,
  Injectable,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from "@angular/material/dialog";
import { SendingTable } from "app/send-message/model/sendingTable";
import { ToasterService } from "angular2-toaster";

let TABLEDATA = [];

let temp = [];
let sent = false;
let deleteUser = false;
let deleteAdmin = false;

@Component({
  selector: "app-forward-message",
  templateUrl: "./forward-message.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./forward-message.component.css"],
})
export class ForwardMessageComponent implements OnInit {
  displayedColumnsUser: string[] = [
    "campaign",
    "sentFrom",
    "receivedDate",
    "action",
  ];
  displayedColumnsAdmin: string[] = [
    "campaign",
    "sentFrom",
    "sentTo",
    "receivedDate",
    "action",
  ];
  dataSource: any;
  user: boolean = false;
  admin: boolean = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public service: AuthService,
    @Inject(ForwardMessageService) private forwardService: ForwardMessageService
  ) {}

  ngOnInit(): void {
    if (this.service.role == "U") {
      this.user = true;
      this.admin = false;
    } else if (this.service.role == "A") {
      this.user = false;
      this.admin = true;
    }

    if (this.service.role === undefined) {
      this.service.role = localStorage.getItem("role");
      // console.log(this.service.role,"undefined this.service.role")
      if (this.service.role == "U") {
        this.user = true;
        this.admin = false;
      } else if (this.service.role == "A") {
        this.user = false;
        this.admin = true;
      }
    }
    let payload = {};
    if (this.user) {
      this.forwardService
        .getUserForwardRequest(payload)
        .subscribe((response) => {
          TABLEDATA = response;
          TABLEDATA.forEach((obj) => {
            let date = new Date(obj.received_date);
            obj.received_date = date.toLocaleDateString();
          });
          this.dataSource = new MatTableDataSource(TABLEDATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.data = TABLEDATA;
        });
    } else {
      this.forwardService
        .getAdminForwardRequest(payload)
        .subscribe((response) => {
          TABLEDATA = response;
          console.log("admin", TABLEDATA);
          TABLEDATA.forEach((obj) => {
            let date = new Date(obj.rec_date);
            obj.rec_date = date.toLocaleDateString();
          });
          this.dataSource = new MatTableDataSource(TABLEDATA);
          this.dataSource.paginator = this.paginator;
          this.dataSource.data = TABLEDATA;
        });
    }
  }

  openForward(val) {
    const dialogRef = this.dialog.open(ForwardDialog, {
      data: {
        rowData: val,
        user: this.user,
        admin: this.admin,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      let payload = {};
      if (this.user) {
        this.forwardService
          .getUserForwardRequest(payload)
          .subscribe((response) => {
            TABLEDATA = response;
            TABLEDATA.forEach((obj) => {
              let date = new Date(obj.received_date);
              obj.received_date = date.toLocaleDateString();
            });
            this.dataSource = new MatTableDataSource(TABLEDATA);
            this.dataSource.paginator = this.paginator;
            this.dataSource.data = TABLEDATA;
          });
      } else {
        this.forwardService
          .getAdminForwardRequest(payload)
          .subscribe((response) => {
            TABLEDATA = response;
            TABLEDATA.forEach((obj) => {
              let date = new Date(obj.rec_date);
              obj.rec_date = date.toLocaleDateString();
            });
            this.dataSource = new MatTableDataSource(TABLEDATA);
            this.dataSource.paginator = this.paginator;
            this.dataSource.data = TABLEDATA;
          });
      }
    });
  }
}

@Component({
  selector: "forward-dialog",
  templateUrl: "./forward-dialog.html",
  styleUrls: ["./forward-message.component.css"],
})
export class ForwardDialog implements OnInit {
  temp: any;
  user: boolean = false;
  admin: boolean = false;
  campaignId: number = null;
  orgId: number = null;
  forwardData: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForwardDialog>,
    @Inject(ForwardMessageService) public forwardService: ForwardMessageService,
    @Inject(ToasterService) public toasterService: ToasterService,
    public service: AuthService
  ) {
    this.user = data.user;
    this.admin = data.admin;
    if (this.user) {
      this.campaignId = data.rowData["campagn_id"];
    } else {
      this.campaignId = data.rowData["campaign_id"];
      this.orgId = data.rowData["org_id"];
    }

    this.temp = temp;
  }

  ngOnInit(): void {
    let payload;
    if (this.user) {
      payload = {
        campaign_id: this.campaignId,
      };
      this.forwardService.userForwardDetails(payload).subscribe((response) => {
        this.forwardData = response;
        this.forwardData.forEach(obj => {
            let date = new Date(obj.received_date);
            obj.received_date = date.toLocaleDateString();
        });
      });
    } else {
      payload = {
        campaign_id: this.campaignId,
        org_id: this.orgId,
      };
      this.forwardService.adminForwardDetails(payload).subscribe((response) => {
        this.forwardData = response;
        this.forwardData.forEach(obj => {
          let sentDate = new Date(obj.sent_date);
          let forwardDate = new Date(obj.forword_date)
          obj.sent_date = sentDate.toLocaleDateString();
          obj.forword_date = forwardDate.toLocaleDateString();
      });
        console.log(this.forwardData);
      });
    }
  }

  forward() {
    let dialogConfirm = this.dialog.open(ForwardConfirm, {
      data: {
        campaignId: this.campaignId,
        user: this.user,
        admin: this.admin,
        action: "Forward",
      },
    });
    dialogConfirm.afterClosed().subscribe((data) => {
      if (data == "success") {
        this.dialogRef.close();
      }
    });
  }

  send() {
    let dialogConfirm = this.dialog.open(ForwardConfirm, {
      data: {
        campaignId: this.campaignId,
        orgId: this.orgId,
        user: this.user,
        admin: this.admin,
        action: "Send",
        message: this.forwardData[0].message,
        sender: this.forwardData[0].sender_name,
        state_sel_type: this.forwardData[0].state_sel_type
      },
    });
    dialogConfirm.afterClosed().subscribe((data) => {
      if (data == "success") {
        this.dialogRef.close();
      }
    });
  }

  deleting() {
    if (this.user) {
      let dialogConfirm = this.dialog.open(ForwardConfirm, {
        data: {
          campaignId: this.campaignId,
          user: this.user,
          admin: this.admin,
          action: "Delete",
        },
        disableClose: true,
      });
      dialogConfirm.afterClosed().subscribe((data) => {
        if (data == undefined) {
          this.dialogRef.close();
        } else if (data == "success") {
          this.toasterService.pop("success", "Request Deleted successfully");
          this.dialogRef.close();
        }
      });
    } else {
      let dialogConfirm = this.dialog.open(ForwardConfirm, {
        data: {
          campaignId: this.campaignId,
          orgId: this.orgId,
          user: this.user,
          admin: this.admin,
          action: "Delete",
        },
        disableClose: true,
      });
      dialogConfirm.afterClosed().subscribe((data) => {
        if (data == undefined) {
          this.dialogRef.close();
        } else if (data == "success") {
          this.toasterService.pop("success", "Request Deleted successfully");
          this.dialogRef.close();
        }
      });
    }
  }
}

@Component({
  selector: "forward-success",
  templateUrl: "./forward-success.html",
  styleUrls: ["./forward-message.component.css"],
})
export class ForwardSuccess {
  sending = sent;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForwardSuccess>
  ) {}
  ngOnInit() {}
}

@Component({
  selector: "forward-confirm",
  templateUrl: "./forward-confirm.html",
  styleUrls: ["./forward-message.component.css"],
})
export class ForwardConfirm {
  user: boolean = false;
  admin: boolean = false;
  campaignId: number = null;
  action: string = "";
  orgId: number = null;
  message: string = "";
  sender: string = "";
  stateSelType: any = null;
  constructor(
    @Inject(ToasterService) public toasterService: ToasterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ForwardConfirm>,
    @Inject(ForwardMessageService)
    private forwardService: ForwardMessageService,
    @Inject(SendMessageService) private messageService: SendMessageService,
    private navService: NavbarService
  ) {
    this.user = data.user;
    this.admin = data.admin;
    this.action = data.action;
    if (this.user) {
      this.campaignId = data.campaignId;
    } else {
      this.campaignId = data.campaignId;
      this.orgId = data.orgId;
      this.message = data.message;
      this.sender = data.sender;
      this.stateSelType = data.state_sel_type;
    }
  }
  ngOnInit() {}
  forwardMessage() {
    let payload;
    let dialogSuccess = this.dialog.open(ForwardSuccess, {
      disableClose: true
    });
    if (this.user) {
      payload = {
        campaign_id: this.campaignId,
      };
      this.forwardService.userForwardButton(payload).subscribe((response) => {
        if (response) {
          dialogSuccess.close();
        }
      });
      dialogSuccess.afterClosed().subscribe((data) => {
        sent = true;
        this.dialog.open(ForwardSuccess, {});
        sent = false;
        this.dialogRef.close("success");
        // dialogSuccess.afterClosed().subscribe( data =>
        // this.dialogRef.close() );
      });
    } else {
      payload = {
        campaign_id: this.campaignId,
        org_id: this.orgId,
        state_sel_type: this.stateSelType
      };
      this.forwardService.adminSent(payload).subscribe((response) => {
        if (response) {
          let resTemp: object[] = response;
        console.log(resTemp);
        let recepients: object[] = [];
        resTemp.forEach(async (obj,index) => {
          if(index !=0 && index % 100==0){
            let message =  {
              flow_id: "5f06b885d6fc052a7a01833f",
              unicode: 1,
              recipients: recepients,
            };
            console.log("inside if",message);
            await this.messageService.sendMessage(message).toPromise().then((response) => {
                console.log(response);
                
              //   if (response.type == "success") {
              //     dialogRef.close();
              //   }
              // });
              },
              (reason)=>{
                console.log(reason);
                
                this.toasterService.pop(
                  "error",
                  "Please Contact Admin",
                  "There seems to be a issue in sending the messages");
                dialogSuccess.close("error");
              });
            recepients = [];
            recepients.push({
              mobiles: "91" + obj['phone'],
              name: obj['name'],
              message: this.message + "\n-" + this.sender +"\n",
            });
          }else{
            recepients.push({
              mobiles: "91" + obj['phone'],
              name: obj['name'],
              message: this.message + "\n-" + this.sender +"\n",
            });
          }
          if(index == resTemp.length-1){
            let message =  {
              flow_id: "5f06b885d6fc052a7a01833f",
              unicode: 1,
              recipients: recepients,
            };
            console.log("inside else if",message);
            await this.messageService.sendMessage(message).toPromise().then((response) => {
              console.log(response);
              
              if (response.type == "success") {
                dialogSuccess.close();
              }
            
            },
            (reason)=>{
              console.log(reason);
              
              this.toasterService.pop(
                "error",
                "Please Contact Admin",
                "There seems to be a issue in sending the messages");
              dialogSuccess.close("error");
            });
          }
        });
        }
      });
      dialogSuccess.afterClosed().subscribe((data) => {
        if(data != 'error'){
          sent = true;
          this.dialog.open(ForwardSuccess, {});
          sent = false;
          this.dialogRef.close("success");
          // dialogSuccess.afterClosed().subscribe( data =>
          // this.dialogRef.close() );
        }
        
      });
    }
  }

  deleteForward() {
    let payload;
    if (this.user) {
      payload = {
        campaign_id: this.campaignId,
      };
      this.forwardService.userDeleteButton(payload).subscribe((response) => {
        if (response) {
          this.dialogRef.close("success");
        }
      });
    } else {
      payload = {
        campaign_id: this.campaignId,
        org_id: this.orgId,
      };
      this.forwardService.adminDelete(payload).subscribe((response) => {
        if (response) {
          this.dialogRef.close("success");
        }
      });
    }
  }
}
