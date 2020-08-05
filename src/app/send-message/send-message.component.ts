import { NavbarService } from './../components/navbar/navbar.service';
import { AuthService } from 'app/auth/auth.service';
import { SendMessageService } from './send-message.service';
import { CityService } from './../city/city.service';
import { StateService } from './../state/state.service';
import { routes } from './../app.routing';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { SendingTable } from './model/sendingTable';
import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddUserDialog } from 'app/portal-users/portal-users.component';
import { ToasterService } from 'angular2-toaster';
import { stringify } from 'querystring';


// const TRIAL = [
//   {fname: 'Nitin', number: 9739888651},
//   {fname: 'Chidambar', number: 9449650338}
// ];
 let trial = [];
 let TABLEDATA = [];
 let sent = false;
 let complete = false;
 let stateSend = [];
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  
  myForm: FormGroup;
  displayedColumns: string[] = ['name', 'states', 'sms','action'];
  dataSource: any;
  sender = "";
  campaign = "";
  message = "";
  sending = false;
  user = false;
  admin = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  constructor(public dialog: MatDialog, private formbuilder: FormBuilder, private toasterService: ToasterService,
    private authService: AuthService,
   @Inject(SendMessageService) private service: SendMessageService,
   private navService: NavbarService) { 
    this.myForm = formbuilder.group({
      sender: ['',[Validators.required]],
      campaign: ['',[Validators.required]],
      message: ['',[Validators.required]],
      dataSource: ['',[Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(TABLEDATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = TABLEDATA;

    if(this.authService.role=='U'){
      this.user=true;
      this.admin=false;
    }else if(this.authService.role=='A'){
      this.user=false;
      this.admin=true;
      }

    if(this.authService.role===undefined){
      this.authService.role=localStorage.getItem('role');
      // console.log(this.service.role,"undefined this.service.role")
      if(this.authService.role=='U'){
        this.user=true;
      this.admin=false;
     }
      else if(this.authService.role=='A'){
        this.user=false;
      this.admin=true;
      }
    }


  }
  addOrganization() {
    const dialogRef = this.dialog.open(AddOrganizationDialog, {

    });  
    dialogRef.afterClosed().subscribe(
      data => {
          
          this.dataSource.data = TABLEDATA;
          console.log(TABLEDATA);
          
          if(data == "200"){
            this.toasterService.pop(
              "success",
              "Added successfully"
            );
          }
          
      }
    );

  }

  sendingMessage(){
    let dialogRef;
    let orgs = [];
    
    TABLEDATA.forEach(obj => {
      orgs.push({
        org_id: ""+obj.orgId,
        states: obj.stateIds,
        msg_type_id: (obj.sms && obj.whatsapp) ? "3" : (obj.sms) ? "1" : "2",
        sms_cnt: obj.sms,
        wa_cnt: obj.whatsapp,
        state_sel_type: (obj.homeState && obj.workState) ? "3" : (obj.homeState) ? "1" : "2"
      });
    });
    console.log(orgs);
    
    let payload = {
      senderName: this.sender,
      campaignName: this.campaign,
      message: this.message,
      portaluser: localStorage.getItem("userID"),
      orgs: orgs
    };
    console.log(payload);
         
    dialogRef = this.dialog.open(SendingDialog, {
      disableClose: true
    });
   if(this.admin){
    this.service.admincreateMessage(payload).subscribe(response =>{
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
            await this.service.sendMessage(message).toPromise().then((response) => {
                console.log(response);
                
              },
              (reason)=>{
                console.log(reason);
                
                this.toasterService.pop(
                  "error",
                  "Please Contact Admin",
                  "There seems to be a issue in sending the messages");
                dialogRef.close("error");
              }
              );
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
            await this.service.sendMessage(message).toPromise().then((response) => {
              console.log(response);
              
              if (response.type == "success") {
                dialogRef.close();
              }
            
            },
            (reason)=> {
              console.log(reason);
              
              this.toasterService.pop(
                "error",
                "Please Contact Admin",
                "There seems to be a issue in sending the messages");
              dialogRef.close("error");
            });
          }
        });
      }
    });
   }else{

    this.service.createMessage(payload).subscribe(response => {
      if(response == "200"){
        dialogRef.close();
      }
    });
   } 
   dialogRef.afterClosed().subscribe(
    data =>{
      if(data != "error"){
        sent =true;
    this.dialog.open(SendingDialog, {
    
    });
    sent= false;
    TABLEDATA = [];
    this.dataSource.data = TABLEDATA;
    complete = false;
    this.campaign = "";
    this.message = "";
    this.sender = "";
    this.myForm.markAsUntouched();
      }
    
  }
  );
  }

  edit_low(row_data){
    let dialogRef = this.dialog.open(AddOrganizationDialog, {
      data: {
        rowData: row_data
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.dataSource.data = TABLEDATA;
      if(data == "200"){
        this.toasterService.pop(
          "success",
          "Updated successfully"
        );
      }
    });
  }
  delete_low(row_data){
    let temp = TABLEDATA.filter(obj => obj !== row_data);
    TABLEDATA = temp;
    this.dataSource.data = TABLEDATA;
    this.toasterService.pop(
      "success",
      "Deleted successfully"
    );
  }

  always(){
    if(complete && this.myForm.valid){
      return false;
    }else{
      return true;
    }
  }
  
}



@Component({
  selector: 'add-organization-dialog',
  templateUrl: 'add-organization-dialog.html',
  styleUrls: ['./send-message.component.css']
})

export class AddOrganizationDialog {
   myForm : FormGroup;
   name = [];
   stateList = [];
   states= [];
   count = [];
   sms= null;
   whatsapp= null;
   countSms = null;
   countWhatsapp = null;
   homeState = null;
   workState = null;
   dialogTitle = "";
   selectedOrgType = [];
   selectedStates = [];
   selectedSms = null;
   selectedWhatsapp = null;
   stateName = [];
   orgName = "";
   save_user = false;
   update_user = false;
   dataEdit : any;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SendingTable, 
    // @Inject(PortalUserService) public service: PortalUserService,
    // @Inject(OnboardingService) public onboardservice:OnboardingService,
    @Inject(ToasterService) public toasterService: ToasterService,

    public dialogRef: MatDialogRef<AddOrganizationDialog>, public service: StateService, public stateService: CityService,
    @Inject(SendMessageService) private sendService: SendMessageService){
      
      if(data){
        this.dataEdit = data;
        console.log(data);
        this.selectedOrgType = data.rowData['orgId'];
        this.selectedStates = data.rowData['stateIds'];
        this.sms = data.rowData['sms'];
        this.whatsapp = data.rowData['whatsapp'];
        this.homeState = data.rowData['homeState'];
        this.workState = data.rowData['workState'];
        this.update_user = true;
        this.dialogTitle = "Update Organization details";
        let payload = {
          org_id : this.selectedOrgType
        }
        this.sendService.getStates(payload).subscribe(response => {
          this.count = response;
          console.log(this.count);
          // this.stateChange({value : this.selectedStates});
        });
      } else{
        this.save_user = true;
        this.dialogTitle = "Add new Organization";
      }

      this.myForm = this.formBuilder.group({
        name: ['',[Validators.required]],
        states: ['', [Validators.required]],
        sms:[''],
        whatsapp: [''],
        homeState: [''],
        workState: ['']
       });
    }

    ngOnInit(){
      let payload = {
        role: localStorage.getItem('role')
      }
      this.service.getState(payload).subscribe(response =>{
        this.name = response;
      });
      this.stateService.getCity(payload).subscribe(response => {
        this.stateList = response;
      });
    }

    orgChange(evt){
      console.log(evt.value);
      
      let temp = TABLEDATA.filter(obj => obj.orgId === evt.value);
      console.log("temp",temp);
      
      if(temp.length == 0){
        let payload = {
          org_id : evt.value
        }
        this.sendService.getStates(payload).subscribe(response => {
          this.count = response;
          console.log(this.count);
          
        });
      }else{
        this.toasterService.pop("error",temp[0]['name']+" already added. Click on edit to make changes");
        this.dialogRef.close();
      }
      
    }

    saveOrg(){
      this.name.forEach(obj => {
        if(obj.org_id === this.selectedOrgType){
          this.orgName = obj.org_name;
        }
      });
      this.selectedStates.forEach(obj => {
        for(let i of this.stateList){
          if(obj === i.state_id){
            this.stateName.push(i.state_name);
            break;
          }
        }  
      });
      let payload = {
        org_id: this.selectedOrgType,
        states: this.selectedStates,
        state_sel_type: (this.homeState && this.workState) ? "3" : (this.homeState) ? "1" : "2"
      };
      this.sendService.getMsgCount(payload).subscribe(response => {
        let res = response;
        
        this.sms ? this.selectedSms = this.countSms : this.selectedSms = '';
        this.whatsapp ? this.selectedWhatsapp = this.countWhatsapp : this.selectedWhatsapp = '';
        console.log(this.selectedOrgType);
        
        // let stateNames = this.selectedStates.map(obj => obj.state_name);
        // let stateIds = this.selectedStates.map(obj => obj.state_id);
        // console.log(stateNames);
        
        TABLEDATA.push({
          name: this.orgName,
          orgId: this.selectedOrgType,
          states: this.stateName,
          stateIds: this.selectedStates,
          sms: res[0].sms_cnt,
          whatsapp: this.selectedWhatsapp,
          homeState: this.homeState,
          workState: this.workState
        });
        complete = true;
        this.dialogRef.close("200");
      });
      
     
    }

    updateOrg(){
      this.name.forEach(obj => {
        if(obj.org_id === this.selectedOrgType){
          this.orgName = obj.org_name;
        }
      });
      this.selectedStates.forEach(obj => {
        for(let i of this.stateList){
          if(obj === i.state_id){
            this.stateName.push(i.state_name);
            console.log(this.stateName);
            break;
          }
        }  
      });

      let payload = {
        org_id: this.selectedOrgType,
        states: this.selectedStates,
        state_sel_type: (this.homeState && this.workState) ? "3" : (this.homeState) ? "1" : "2"
      };
      this.sendService.getMsgCount(payload).subscribe(response => {
        let res = response;
        this.sms ? this.selectedSms = this.countSms : this.selectedSms = '';
      this.whatsapp ? this.selectedWhatsapp = this.countWhatsapp : this.selectedWhatsapp = '';
      let index = TABLEDATA.findIndex(obj => obj.orgId == this.dataEdit.rowData['orgId']);
      TABLEDATA[index].name = this.orgName;
      TABLEDATA[index].orgId = this.selectedOrgType;
      TABLEDATA[index].stateIds = this.selectedStates;
      TABLEDATA[index].states = this.stateName;
      TABLEDATA[index].sms = res[0].sms_cnt;
      TABLEDATA[index].whatsapp = this.selectedWhatsapp;
      TABLEDATA[index].homeState = this.homeState;
      TABLEDATA[index].workState = this.workState;
      this.dialogRef.close("200");
      });
      
    }

    // stateChange(evt){
    //   stateSend = evt.value;
    //   console.log(stateSend);
      
    // }
    validate(){
      if(this.myForm.valid && (this.homeState || this.workState)){
        return false;
      }else{
        return true;
      }

    }
}


@Component({
  selector: 'sending-dialog',
  templateUrl: 'sending-dialog.html',
  styleUrls: ['./send-message.component.css']
})

export class SendingDialog{
  sending = sent;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SendingDialog>){ }

  ngOnInit(){

  }
}