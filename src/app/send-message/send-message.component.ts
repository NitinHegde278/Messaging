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

const STATES = [
  {id:1, org: 'Organization-A', states:['Karnataka','Kerala'],sms:30000, whatsapp:38000},
  {id:6, org: 'Organization-B', states:['Karnataka','Maharashtra','Tamil Nadu'], sms:50000, whatsapp:28000},
  {id:7, org: 'Organization-C', states:['Madhya Pradesh','Kerala','Odissa'], sms:35000, whatsapp:15000},
  {id:8, org: 'Organization-D', states:['Karnataka','Andhra Pradesh','Telangana'], sms:80600, whatsapp:98000},
  {id:9, org: 'Organization-E', states:['Maharashtra','Andhra Pradesh','Telangana','Kerala'], sms:20000, whatsapp:38000},
  {id:17, org: 'Organization-F', states:['Odissa','Andhra Pradesh','Punjab','Uttar Pradesh'], sms:60000, whatsapp:78000},
  
  
];
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
  displayedColumns: string[] = ['name', 'states', 'sms', 'whatsapp','action'];
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
   @Inject(SendMessageService) private service: SendMessageService) { 
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
   if(this.admin){
    let recepients = [];
   trial.forEach(obj => {
     if(recepients.length <= 1){
      recepients.push({
        mobiles: "91"+obj.phone,
        name: obj.name,
        message: this.message+ "\n-" +this.sender
      });
      console.log("in if");
      
     }else{
      let payload = {
        flow_id: "5f06b885d6fc052a7a01833f",
        recipients: recepients
      };
      console.log(payload);

      this.service.sendMessage(payload).subscribe(response => {
        console.log(response);
        
        // if(response.type == "success"){
        //   dialogRef.close();
        // }
      });
       recepients = [];
       recepients.push({
        mobiles: "91"+obj.phone,
        name: obj.name,
        message: this.message+ "<br/>-" +this.sender
      });
     }
      
    });
    console.log(recepients);
    let payload = {
      flow_id: "5f06b885d6fc052a7a01833f",
      recipients: recepients
    };
    console.log(payload);

    this.service.sendMessage(payload).subscribe(response => {
      console.log(response);
      
      if(response.type == "success"){
        dialogRef.close();
      }
    });
    // let payload = {
    //   flow_id: "5f06b885d6fc052a7a01833f",
    //   recipients: recepients
    // };
    // console.log(payload);
    dialogRef = this.dialog.open(SendingDialog, {

    });  
    
    // setInterval(() => 
    // dialogRef.close()
    // ,5000);
    // this.service.sendMessage(payload).subscribe(response => {
    //   console.log(response);
      
    //   if(response.type == "success"){
    //     dialogRef.close();
    //   }
    // });


   }else{
    let orgs = [];
    
    TABLEDATA.forEach(obj => {
      orgs.push({
        org_id: ""+obj.orgId,
        states: obj.stateIds,
        msg_type_id: (obj.sms && obj.whatsapp) ? "3" : (obj.sms) ? "1" : "2"
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

    });
    this.service.createMessage(payload).subscribe(response => {
      if(response == "200"){
        dialogRef.close();
      }
    });
   } 
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
    this.sender = "";
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
   sms= null;
   whatsapp= null;
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
    @Inject(SendMessageService) private Numberservice: SendMessageService){
      
      if(data){
        this.dataEdit = data;
        console.log(data.rowData['name']);
        
        this.selectedOrgType = data.rowData['orgId'];
        this.selectedStates = data.rowData['stateIds'];
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
      for(let x of this.states){
        if(x.org == this.orgName){
          console.log("here in ",this.orgName);
          
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
      console.log(this.selectedOrgType);
      
      // let stateNames = this.selectedStates.map(obj => obj.state_name);
      // let stateIds = this.selectedStates.map(obj => obj.state_id);
      // console.log(stateNames);
      
      TABLEDATA.push({
        name: this.orgName,
        orgId: this.selectedOrgType,
        states: this.stateName,
        stateIds: this.selectedStates,
        sms: this.selectedSms,
        whatsapp:this.selectedWhatsapp
      });
      complete = true;
      let payload = {
        states: this.stateName
      };
      this.Numberservice.getNumbers(payload).subscribe(response => {
        if(response){
          trial = response;
        }
        console.log(response);
        
      });
      this.dialogRef.close("200");
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
      for(let x of this.states){
        if(x.org == this.orgName){
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
      let index = TABLEDATA.findIndex(obj => obj.orgId == this.dataEdit.rowData['orgId']);
      TABLEDATA[index].name = this.orgName;
      TABLEDATA[index].orgId = this.selectedOrgType;
      TABLEDATA[index].stateIds = this.selectedStates;
      TABLEDATA[index].states = this.stateName;
      TABLEDATA[index].sms = this.selectedSms;
      TABLEDATA[index].whatsapp = this.selectedWhatsapp;
      this.dialogRef.close("200");
    }

    // stateChange(evt){
    //   stateSend = evt.value;
    //   console.log(stateSend);
      
    // }
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