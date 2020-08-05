import { SentReportService } from './sent-report.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ForwardDialog } from 'app/forward-message/forward-message.component';
import { ForwardMessageService } from 'app/forward-message/forward-message.service';

let TABLEDATA = [];

@Component({
  selector: 'app-sent-report',
  templateUrl: './sent-report.component.html',
  styleUrls: ['./sent-report.component.css']
})
export class SentReportComponent implements OnInit {
  tabs = [
    {id:1, name:"Waiting at Organization"},
    {id:2, name:"Waiting at Admin"},
    {id:3, name:"Sent Successfully"}
  ];
  displayedColumns: string[] = ['campaign', 'sentTo', 'sentDate', 'action'];
  displayedColumns1: string[] = ['campaign', 'sentTo', 'sentDate', 'sms', 'action'];

  dataSource: any;
  user: boolean = false;
  admin: boolean= false;
  @ViewChild('pag1', {static: false}) paginator1: MatPaginator;
  @ViewChild('pag2', {static: false}) paginator2: MatPaginator;
  @ViewChild('pag3', {static: false}) paginator3: MatPaginator;
  @ViewChild('pag4', {static: false}) paginator4: MatPaginator;
  constructor(private service: AuthService,
    @Inject(SentReportService) private sentService: SentReportService,
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
      this.sentService.sentUserAtOrg(payload).subscribe(response => {
        TABLEDATA = response;
        console.log(response);
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          obj.received_date = date.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.data = TABLEDATA;
      });
    }else{
      this.sentService.sentAdminSuccess(payload).subscribe(response => {
        TABLEDATA = response;
        console.log(response);
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.admin_send_date);
          obj.admin_send_date = date.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator4;
        this.dataSource.data = TABLEDATA;
      });
    }
  }

  tabChange(evt){
    let payload = {};
    if(evt.index == 0){
      this.sentService.sentUserAtOrg(payload).subscribe(response => {
        TABLEDATA = response;
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          obj.received_date = date.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator1;
        this.dataSource.data = TABLEDATA;
      });
    } else if(evt.index == 1){
      this.sentService.sentUserAtAdmin(payload).subscribe(response => {
        TABLEDATA = response;
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          obj.received_date = date.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator2;
        this.dataSource.data = TABLEDATA;
      });
    } else{
      this.sentService.sentUserSuccess(payload).subscribe(response => {
        TABLEDATA = response;
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          obj.received_date = date.toLocaleDateString();
        });
        console.log(TABLEDATA);
        this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator3;
        this.dataSource.data = TABLEDATA;
      });
    }
    
  }

  openSent(rowData){
    const dialogRef = this.dialog.open(SentOpenDialog,{
      data: {
        rowData: rowData,
        user: this.user,
        admin: this.admin
      }
    });
  }

}




@Component({
  selector: 'sent-open-dialog',
  templateUrl: './sent-open-dialog.html',
  styleUrls: ['./sent-report.component.css']
})

export class SentOpenDialog{
 user: boolean = false;
 admin: boolean = false;
 campaignId = '';
 orgId = '';
 forwardData = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog, public dialogRef: MatDialogRef<ForwardDialog>,
  private sentService: SentReportService){
    if(data){
      this.user = data.user;
      this.admin = data.admin;
      if(this.user){
        this.campaignId = data.rowData['campagn_id'];
      }else{
        this.campaignId = data.rowData['campaign_id'];
      }
      
      this.orgId = data.rowData['org_id'];
    }
  }

  ngOnInit(){
    let payload = {
      campaign_id: this.campaignId,
      org_id: this.orgId
    }
    if(this.user){
    this.sentService.sentUserDetail(payload).subscribe(response => {
      this.forwardData = response;
        let date = new Date(this.forwardData[0].sent_date);
        this.forwardData[0].sent_date = date.toLocaleDateString();
      console.log(this.forwardData);
    });
  } else{
    this.sentService.sentAdminDetail(payload).subscribe(response => {
      this.forwardData = response;
      let date = new Date(this.forwardData[0].sent_date);
        this.forwardData[0].sent_date = date.toLocaleDateString();
      console.log(response);
    });
  }
  }


}