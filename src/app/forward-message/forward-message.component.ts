import { AuthService } from './../auth/auth.service';
import { element } from 'protractor';

import { Component, OnInit, ViewEncapsulation, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SendingTable } from 'app/send-message/model/sendingTable';
import { ToasterService } from 'angular2-toaster';
import { AddOrganizationDialog } from 'app/send-message/send-message.component';

let TABLEDATA = [
  {campaign: 'Olika Varianter av',message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
   sentFrom: 'Organization-A',contact:'Nitin',contactNo:'9739888651', receivedDate: '23/08/2019',states:['karnataka','kerala'], sms: 34000, whatsapp: 80000},
  {campaign: 'Olika VarS', message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
   sentFrom: 'Organization-C',contact:'Bill',contactNo:'923923651', receivedDate: '13/02/2020',states:['Maharashtra','kerala'], sms: 24000, whatsapp: 60000},
  {campaign: 'Den unspruliga',message:'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
   sentFrom: 'Organization-D',contact:'Django',contactNo:'7234888651', receivedDate: '28/03/2020',states:['karnataka','Andhra Pradesh','Telangana'], sms: 44000, whatsapp: 90000}
];

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

  constructor(public dialog: MatDialog, public service: AuthService) { }

  ngOnInit(): void {
    if(this.service.role_id==1){
      this.user=true;
      this.admin=false;
      this.dataSource = new MatTableDataSource(TABLEDATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = TABLEDATA;
    
    }else if(this.service.role_id==3){
      this.user=false;
      this.admin=true;
      this.dataSource = new MatTableDataSource(TABLEDATA1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = TABLEDATA1;
    
    }

    if(this.service.role_id===undefined){
      this.service.role_id=localStorage.getItem('role');
      // console.log(this.service.role_id,"undefined this.service.role_id")
      if(this.service.role_id==1){
        this.user=true;
      this.admin=false;
      this.dataSource = new MatTableDataSource(TABLEDATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = TABLEDATA;
    
      }
      else if(this.service.role_id==3){
        this.user=false;
      this.admin=true;
      this.dataSource = new MatTableDataSource(TABLEDATA1);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = TABLEDATA1;
    
      }
    }

    
  }

  openForward(val){
    temp = val;
    console.log(temp);
    
    const dialogRef = this.dialog.open(ForwardDialog,{
    });
    dialogRef.afterClosed().subscribe(data=> {
      if(this.user){
        this.dataSource.data = TABLEDATA;
      } else if(this.admin){
        this.dataSource.data = TABLEDATA1;
      }
     
    });

  }

}


@Component({
  selector: 'forward-dialog',
  templateUrl: './forward-dialog.html',
  styleUrls: ['./forward-message.component.css']
})

export class ForwardDialog{
  temp: any;
  user: boolean= false;
  admin: boolean= false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SendingTable,
    public dialog: MatDialog, public dialogRef: MatDialogRef<ForwardSuccess>, 
  // @Inject(PortalUserService) public service: PortalUserService,
  // @Inject(OnboardingService) public onboardservice:OnboardingService,
  @Inject(ToasterService) public toasterService: ToasterService,public service: AuthService) { 
    if(this.service.role_id==1){
      this.user=true;
      deleteUser=true;
      deleteAdmin = false;
      this.admin=false;
    
    }else if(this.service.role_id==3){
      this.user=false;
      deleteUser=false;
      deleteAdmin = true;
      this.admin=true;
      
    }

    if(this.service.role_id===undefined){
      this.service.role_id=localStorage.getItem('role');
      // console.log(this.service.role_id,"undefined this.service.role_id")
      if(this.service.role_id==1){
        this.user=true;
        deleteUser=true;
      deleteAdmin = false;
      this.admin=false;
      }
      else if(this.service.role_id==3){
        this.user=false;
        deleteUser=false;
      deleteAdmin = true;
      this.admin=true;
      }
    }
    this.temp = temp;
  }

  forward(){
    if(this.user){
      let rem = TABLEDATA.filter(obj => obj !==this.temp );
      TABLEDATA = rem;
    }else if(this.admin){
      let rem = TABLEDATA1.filter(obj => obj !==this.temp );
      TABLEDATA1 = rem;
    }
   

    let dialogSuccess = this.dialog.open(ForwardSuccess,{
    });

    setInterval(() => {
      dialogSuccess.close();
    }, 3000);

    dialogSuccess.afterClosed().subscribe(
      data =>{
      sent =true;
      this.dialog.open(ForwardSuccess, {

      });
      sent= false;
      this.dialogRef.close();
      
      // dialogSuccess.afterClosed().subscribe( data =>
      // this.dialogRef.close() );
    }
    );
    
  }
   
  deleting(){
    // if(this.user){
    //   let rem = TABLEDATA.filter(obj => obj !==this.temp );
    //   TABLEDATA = rem;
    // }else if(this.admin){
    //   let rem = TABLEDATA1.filter(obj => obj !==this.temp );
    //   TABLEDATA1 = rem;
    // }
    let dialogDelete = this.dialog.open(ForwardDelete,{
    });
    dialogDelete.afterClosed().subscribe(data => {
      
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
  selector: 'forward-delete',
  templateUrl: './forward-delete.html',
  styleUrls: ['./forward-message.component.css']
})

export class ForwardDelete{
  temp : any;
  constructor(@Inject(ToasterService) public toasterService: ToasterService,
  public dialog: MatDialog, public dialogRef: MatDialogRef<ForwardDelete>){ 
    this.temp = temp;
  };
  ngOnInit(){
  }
  deleteForward(){
    if(deleteUser){
      let rem = TABLEDATA.filter(obj => obj !== this.temp );
      TABLEDATA = rem;
    }else if(deleteAdmin){
      let rem = TABLEDATA1.filter(obj => obj !==this.temp );
      TABLEDATA1 = rem;
    }
    this.dialogRef.close();
    this.toasterService.pop(
      "success",
      "Request Deleted successfully",
    );
    return "success";
  }
}