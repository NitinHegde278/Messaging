import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from 'app/auth/auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ForwardDialog } from 'app/forward-message/forward-message.component';
import { ForwardReportService } from './forward-report.service';

let TABLEDATA = [];
@Component({
  selector: 'app-forwarded-report',
  templateUrl: './forwarded-report.component.html',
  styleUrls: ['./forwarded-report.component.css']
})
export class ForwardedReportComponent implements OnInit {

  displayedColumns: string[] = ['campaign', 'sentFrom', 'receivedDate', 'forwardDate','action'];
  displayedColumns1: string[] = ['campaign','sentFrom','sentDate','sentTo','action'];
  dataSource: any;
  user: boolean = false;
  admin: boolean= false;
  @ViewChild('pag1', {static: false}) paginator1: MatPaginator;
  @ViewChild('pag2', {static: false}) paginator2: MatPaginator;
  @ViewChild('pag3', {static: false}) paginator3: MatPaginator;
  constructor(private service: AuthService,
    @Inject(ForwardReportService) private forwardService: ForwardReportService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.service.role=='U'){
      this.user=true;
      this.admin=false;
    }else if(this.service.role=='A'){
      this.user=false;
      this.admin=true;
    }

    if(this.service.role===undefined){
      this.service.role=localStorage.getItem('role');
      // console.log(this.service.role,"undefined this.service.role")
      if(this.service.role=='U'){
        this.user=true;
      this.admin=false;
      }
      else if(this.service.role=='A'){
        this.user=false;
      this.admin=true;
      }
    }
    let payload = {};
    if(this.user){
      this.forwardService.forwardUserAtAdmin(payload).subscribe(response => {
        TABLEDATA = response;
        console.log(response);
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          let date2 = new Date(obj.org_forword_date);
          obj.received_date = date.toLocaleDateString();
          obj.org_forword_date = date2.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.data = TABLEDATA;
      });
    }
    else{
      this.forwardService.forwardAdmin(payload).subscribe(response =>{
        TABLEDATA = response;
        console.log(response);
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.admin_send_date);
          obj.admin_send_date = date.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator3;
        this.dataSource.data = TABLEDATA;
      });
    }
  }

  tabChange(evt){
    let payload = {};
    if(evt.index == 0){
      this.forwardService.forwardUserAtAdmin(payload).subscribe(response => {
        TABLEDATA = response;
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          let date2 = new Date(obj.org_forword_date);
          obj.received_date = date.toLocaleDateString();
          obj.org_forword_date = date2.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.data = TABLEDATA;
      });
    } else{
      this.forwardService.forwardUserSuccess(payload).subscribe(response => {
        TABLEDATA = response;
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          let date2 = new Date(obj.org_forword_date);
          obj.received_date = date.toLocaleDateString();
          obj.org_forword_date = date2.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator2;
        this.dataSource.data = TABLEDATA;
      });
    }
    
  }

  openSent(rowData){
    const dialogRef = this.dialog.open(ForwardOpenDialog,{
      data: {
        rowData: rowData,
        user: this.user,
        admin: this.admin
      }
    });
  }

}




@Component({
  selector: 'forward-open-dialog',
  templateUrl: './forward-open-dialog.html',
  styleUrls: ['./forwarded-report.component.css']
})

export class ForwardOpenDialog{
 user: boolean = false;
 admin: boolean = false;
 campaignId = '';
 orgId = '';
 forwardData = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog, public dialogRef: MatDialogRef<ForwardDialog>,
  private forwardService: ForwardReportService){
    if(data){
      this.user = data.user;
      this.admin = data.admin;
      this.campaignId = data.rowData['campaign_id'];
      this.orgId = data.rowData['org_id'];
    }
  }

  ngOnInit(){
    let payload = {
      campaign_id: this.campaignId,
      org_id: this.orgId
    }
    if(this.user){
    this.forwardService.forwardUserDetail(payload).subscribe(response => {
      this.forwardData = response;
      console.log(this.forwardData);
        let date = new Date(this.forwardData[0].receive_date);
        let date2 = new Date(this.forwardData[0].org_forword_date);
        if(this.forwardData[0].approvedate){
          let date3 = new Date(this.forwardData[0].approvedate);
          this.forwardData[0].approvedate = date3.toLocaleDateString();
        }
        this.forwardData[0].receive_date = date.toLocaleDateString();
        this.forwardData[0].org_forword_date = date2.toLocaleDateString();
      console.log(this.forwardData);
    });
  }else{
    this.forwardService.forwardAdminDetail(payload).subscribe(response => {
      this.forwardData = response;
      console.log(response);
        let date = new Date(this.forwardData[0].sent_date);
        let date2 = new Date(this.forwardData[0].fwd_date);
        let date3 = new Date(this.forwardData[0].approved_date);
        this.forwardData[0].sent_date = date.toLocaleDateString();
        this.forwardData[0].fwd_date = date2.toLocaleDateString();
        this.forwardData[0].approved_date = date3.toLocaleDateString();
      console.log(this.forwardData);
    });
  }
  }


}
