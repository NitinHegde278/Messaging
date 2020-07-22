import { ForwardMessageService } from './forward-message.service';
import { AuthService } from './../auth/auth.service';
import { element } from 'protractor';

import { Component, OnInit, ViewEncapsulation, ViewChild, Inject, Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SendingTable } from 'app/send-message/model/sendingTable';
import { ToasterService } from 'angular2-toaster';
import { AddOrganizationDialog } from 'app/send-message/send-message.component';

let TABLEDATA = [];

let TABLEDATA1 = [
  {campaign: 'Olika Varianter av',message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
   sentFrom: 'Organization-A',sentTo: 'Organization-B', contact:'Nitin',contactNo:'9739888651', receivedDate: '23/08/2019',states:['karnataka','kerala'],Fcontact:'Harry',FcontactNo: '9823728372', forwardedDate: '24/08/2019', sms: 34000, whatsapp: 80000},
  {campaign: 'Olika VarS', message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
   sentFrom: 'Organization-C',sentTo: 'Organization-A', contact:'Bill',contactNo:'923923651', receivedDate: '13/02/2020',states:['Maharashtra','kerala'],Fcontact:'Nitin',FcontactNo: '7823728372', forwardedDate: '15/02/2020', sms: 24000, whatsapp: 60000},
  {campaign: 'Den unspruliga',message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
   sentFrom: 'Organization-D',sentTo: 'Organization-E', contact:'Django',contactNo:'7234888651', receivedDate: '28/03/2020',states:['karnataka','Andhra Pradesh','Telangana'],Fcontact:'Mike',FcontactNo: '8211728372', forwardedDate: '30/03/2020', sms: 44000, whatsapp: 90000},
   {campaign: 'Den unspruliga',message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
   sentFrom: 'Organization-D',sentTo: 'Organization-E', contact:'Django',contactNo:'7234888651', receivedDate: '28/03/2020',states:['karnataka','Andhra Pradesh','Telangana'],Fcontact:'Mike',FcontactNo: '9823728372', forwardedDate: '30/03/2020', sms: 44000, whatsapp: 90000}
];

let temp = [];
let sent = false;
let deleteUser = false;
let deleteAdmin = false;

@Component({
  selector: 'app-forward-message',
  templateUrl: './forward-message.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./forward-message.component.css']
})
export class ForwardMessageComponent implements OnInit {
  displayedColumnsUser: string[] = ['campaign', 'sentFrom', 'receivedDate', 'action'];
  displayedColumnsAdmin: string[] = ['campaign', 'sentFrom', 'sentTo', 'receivedDate', 'action'];
  dataSource: any;
  user: boolean = false;
  admin: boolean= false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public service: AuthService,
    @Inject(ForwardMessageService) private forwardService: ForwardMessageService) { 
      
    }

  ngOnInit(): void {
    let payload ={};

      this.forwardService.getUserForwardRequest(payload).subscribe(response => {
        TABLEDATA = response;
        TABLEDATA.forEach(obj => {
          let date = new Date(obj.received_date);
          obj.received_date = date.toLocaleDateString();
        });
        console.log(TABLEDATA);
        if(this.service.role=='U'){
          this.user=true;
          this.admin=false;
          this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = TABLEDATA;
        
        }else if(this.service.role=='A'){
          this.user=false;
          this.admin=true;
          this.dataSource = new MatTableDataSource(TABLEDATA1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = TABLEDATA1;
        
        }
    
        if(this.service.role===undefined){
          this.service.role=localStorage.getItem('role');
          // console.log(this.service.role,"undefined this.service.role")
          if(this.service.role=='U'){
            this.user=true;
          this.admin=false;
          this.dataSource = new MatTableDataSource(TABLEDATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = TABLEDATA;
        
          }
          else if(this.service.role=='A'){
            this.user=false;
          this.admin=true;
          this.dataSource = new MatTableDataSource(TABLEDATA1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = TABLEDATA1;
        
          }
        }
      });
    
  }

  openForward(val){
    const dialogRef = this.dialog.open(ForwardDialog,{
      data: {
        rowData: val,
        user:this.user,
        admin:this.admin
      },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(data=> {
      let payload ={};
      if(this.user){
        this.forwardService.getUserForwardRequest(payload).subscribe(response => {
          TABLEDATA = response;
          TABLEDATA.forEach(obj => {
            let date = new Date(obj.received_date);
            obj.received_date = date.toLocaleDateString();
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
  selector: 'forward-dialog',
  templateUrl: './forward-dialog.html',
  styleUrls: ['./forward-message.component.css']
})

export class ForwardDialog implements OnInit{
  temp: any;
  user: boolean= false;
  admin: boolean= false;
  campaignId: number = null;
  forwardData: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, public dialogRef: MatDialogRef<ForwardDialog>, 
  @Inject(ForwardMessageService) public forwardService: ForwardMessageService,
  @Inject(ToasterService) public toasterService: ToasterService,public service: AuthService) { 
    this.user = data.user;
    this.admin = data.admin;
    this.campaignId = data.rowData['campagn_id'];
    this.temp = temp;
  }

  ngOnInit(): void{
    let payload = {
      campaign_id : this.campaignId
    };
    if(this.user){
      this.forwardService.userForwardDetails(payload).subscribe(response =>{
        this.forwardData = response;
      });
    }
    
  }

  forward(){
    let dialogConfirm = this.dialog.open(ForwardConfirm,{
      data: {
        campaignId : this.campaignId,
        user: this.user,
        admin: this.admin,
        action: 'Forward'
      }
    });
    dialogConfirm.afterClosed().subscribe(data => {
      if(data == undefined){
        this.dialogRef.close();
      }
    });

  }
   
  deleting(){
    let dialogConfirm = this.dialog.open(ForwardConfirm,{
      data: {
        campaignId : this.campaignId,
        user: this.user,
        admin: this.admin,
        action: 'Delete'
      },
      disableClose: true
    });
    dialogConfirm.afterClosed().subscribe(data => {
      if(data == undefined){
        this.dialogRef.close();
      } 
    });
    
  }

}


@Component({
  selector: 'forward-success',
  templateUrl: './forward-success.html',
  styleUrls: ['./forward-message.component.css']
})

export class ForwardSuccess{
  sending = sent;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<ForwardSuccess>){ };
  ngOnInit(){

  }
}


@Component({
  selector: 'forward-confirm',
  templateUrl: './forward-confirm.html',
  styleUrls: ['./forward-message.component.css']
})

export class ForwardConfirm{
  user : boolean = false;
  admin: boolean = false;
  campaignId: number = null;
  action: string = '';
  constructor(@Inject(ToasterService) public toasterService: ToasterService,
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog, public dialogRef: MatDialogRef<ForwardConfirm>,
  @Inject(ForwardMessageService) private forwardService: ForwardMessageService){ 
    this.campaignId = data.campaignId;
    this.user = data.user;
    this.admin = data.admin;
    this.action = data.action;
  };
  ngOnInit(){
  }
  forwardMessage(){
    let payload = {
      campaign_id: this.campaignId
    }
    let dialogSuccess = this.dialog.open(ForwardSuccess,{
    });
    if(this.user){
      this.forwardService.userForwardButton(payload).subscribe(response => {
        if(response){
        dialogSuccess.close();
        }
      });
      dialogSuccess.afterClosed().subscribe(
        data =>{
        sent =true;
        this.dialog.open(ForwardSuccess, {
  
        });
        sent= false;
        this.dialogRef.close();
        return "success";
        // dialogSuccess.afterClosed().subscribe( data =>
        // this.dialogRef.close() );
      }
      );
      
    }
  }
  deleteForward(){
    let payload = {
      campaign_id: this.campaignId
    }
    if(this.user){
      this.forwardService.userDeleteButton(payload).subscribe(response => {
        if(response){
          this.dialogRef.close();
          this.toasterService.pop(
            "success",
            "Request Deleted successfully",
          );
            return "success";
        }
      });
    }
    
  }
}