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

const STATES = [
  {org: 'Organization-A', states:['Karnataka','Kerala'],sms:30000, whatsapp:38000},
  {org: 'Organization-B', states:['Karnataka','Maharashtra','Tamil Nadu'], sms:50000, whatsapp:28000},
  {org: 'Organization-C', states:['Madhya Pradesh','Kerala','Odissa'], sms:35000, whatsapp:15000},
  {org: 'Organization-D', states:['Karnataka','Andhra Pradesh','Telangana'], sms:80600, whatsapp:98000},
  {org: 'Organization-E', states:['Maharashtra','Andhra Pradesh','Telangana','Kerala'], sms:20000, whatsapp:38000},
  {org: 'Organization-F', states:['Odissa','Andhra Pradesh','Punjab','Uttar Pradesh'], sms:60000, whatsapp:78000},
  
  
];
 let TABLEDATA = [];
 let sent = false;
 let complete = false;
@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  
  myForm: FormGroup;
  displayedColumns: string[] = ['name', 'states', 'sms', 'whatsapp','action'];
  dataSource: any;
  campaign = "";
  message = "";
  sending = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  

  constructor(public dialog: MatDialog, private formbuilder: FormBuilder, private toasterService: ToasterService) { 
    this.myForm = formbuilder.group({
      campaign: ['',[Validators.required]],
      message: ['',[Validators.required]],
      dataSource: ['',[Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(TABLEDATA);
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = TABLEDATA;
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
    let dialogRef = this.dialog.open(SendingDialog, {

    });  
    setInterval(() => {
      dialogRef.close();
    }, 3000);
    
    dialogRef.afterClosed().subscribe(
      data =>{
      sent =true;
      this.dialog.open(SendingDialog, {
      
      });
      sent= false;
      TABLEDATA = [];
      this.dataSource.data = TABLEDATA;
      complete = false;
      this.campaign = "";
      this.message = "";
      this.myForm.markAsUntouched();
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
   sms= null;
   whatsapp= null;
   dialogTitle = "";
   selectedOrgType = "";
   selectedStates = [];
   selectedSms = null;
   selectedWhatsapp = null;
   save_user = false;
   update_user = false;
   dataEdit : any;
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: SendingTable, 
    // @Inject(PortalUserService) public service: PortalUserService,
    // @Inject(OnboardingService) public onboardservice:OnboardingService,
    @Inject(ToasterService) public toasterService: ToasterService,

    public dialogRef: MatDialogRef<AddOrganizationDialog>, public service: StateService, public stateService: CityService){
      
      if(data){
        this.dataEdit = data;
        this.selectedOrgType = data.rowData['name'];
        this.selectedStates = data.rowData['states'];
        this.sms = data.rowData['sms'];
        this.whatsapp = data.rowData['whatsapp'];
        this.update_user = true;
        this.dialogTitle = "Update Organization details";
      } else{
        this.save_user = true;
        this.dialogTitle = "Add new Organization";
      }

      this.myForm = this.formBuilder.group({
        name: ['',[Validators.required]],
        states: ['', [Validators.required]],
        sms:[''],
        whatsapp: ['']
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
      this.states = STATES;
    }

    saveOrg(){
      
      for(let x of this.states){
        if(x.org == this.selectedOrgType){
          if(this.sms){
            this.selectedSms = x.sms;
          }else{
            this.selectedSms = '';
          }
          if(this.whatsapp){
            this.selectedWhatsapp = x.whatsapp;
          }else{
            this.selectedWhatsapp = '';
          }
          
          
        }
      }
      TABLEDATA.push({
        name: this.selectedOrgType,
        states: this.selectedStates,
        sms: this.selectedSms,
        whatsapp:this.selectedWhatsapp
      });
      complete = true;
      this.dialogRef.close("200");
    }

    updateOrg(){
      for(let x of this.states){
        if(x.org == this.selectedOrgType){
          if(this.sms){
            this.selectedSms = x.sms;
          }else{
            this.selectedSms = '';
          }
          if(this.whatsapp){
            this.selectedWhatsapp = x.whatsapp;
          }else{
            this.selectedWhatsapp = '';
          }

        }
      }
      let index = TABLEDATA.findIndex(obj => obj.name == this.dataEdit.rowData['name']);
      TABLEDATA[index].name = this.selectedOrgType;
      TABLEDATA[index].states = this.selectedStates;
      TABLEDATA[index].sms = this.selectedSms;
      TABLEDATA[index].whatsapp = this.selectedWhatsapp;
      this.dialogRef.close("200");
    }

    validate(){
      if(this.myForm.valid && (this.sms || this.whatsapp)){
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