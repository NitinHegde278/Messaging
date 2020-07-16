import { StateService } from './../state/state.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { PortalUserService } from './portal-users.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
   
   import { MAT_DIALOG_DATA, MatDialog, MatDialogRef,
     } from '@angular/material/dialog';
import { PortalUser } from 'app/portal-users/model/portal';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ToasterModule,
  ToasterService,
  BodyOutputType,
  ToasterConfig
} from "angular2-toaster";
import { inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { enableDebugTools } from '@angular/platform-browser';
import { variable } from '@angular/compiler/src/output/output_ast';

export interface PeriodicElement {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-portal-users',
  templateUrl: './portal-users.component.html',
  styleUrls: ['./portal-users.component.scss']
})
export class PortalUsersComponent implements OnInit {
  tableData: PortalUser[] = [];
  showportalusers: boolean;
  // rowData = null;
  checked:boolean= false;
  color:'green';
  disabled:false;
  role_id:any=localStorage.getItem('role');
  // checked: boolean;


  /** For the Add user dialog box */
  displayedColumns: string[] = ['name', 'email', 'mobile', 'role', 'action'];
  public dataSource = new MatTableDataSource<any>(this.tableData);
  

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // showSearchComp:boolean=true;
  // portalUserColumns = PortalUserColumns;
  // displayedColumns: string[] = PortalUserColumns.map(column => column.name);

  // tableData: PortalUser[] = [];
  // dataSource = new MatTableDataSource(this.tableData);
  // showportalusers:boolean=false;
  // ELEMENT_DATA= [];
  constructor(private service: PortalUserService, public dialog: MatDialog, ) { }

  ngOnInit() {

    let payload = {
      role:this.role_id
    };
    this.getPortalUsers(payload);
    // this.ELEMENT_DATA=[
    //   { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
    //   { position: 2, name: "Helium", weight: 4.0026, symbol: "He" },
    //   { position: 3, name: "Lithium", weight: 6.941, symbol: "Li" },
    // ];
    //  this.dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
    // console.log(this.tableData, "table portal users")

    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.dataSource.paginator = this.paginator;
  }
  
  toggle(row_data: any, event) {
    let Active_state;
    // console.log(event.checked, "vhg");
    if (event.checked == true) {
      Active_state = "Active";
    } else {
      Active_state = "Disable";
    }

    let payload = {
      user_id : row_data.id,
      Active_status: Active_state,
    }
    // console.log(payload, "ghghjg")
   
    this.service.statuscheck(payload)
      .subscribe(response => {
        let data;
        data=response;
        // console.log(data,"true")
      });
  }

  delete_low(row_data: any) {
    // console.log(row_data, "row_datarow_data")
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      data: {
        rowdata: row_data
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          // console.log(data, "incomingdatafromdelete");
          // this.get_Portal_users();
          let data1 = {
            role:this.role_id
          }
          this.getPortalUsers(data1);

        }

      }
    );
  }



  getPortalUsers(payload) {
    this.service.getPortalUsers(payload)
      .subscribe(response => {
        // let data_resp:any;
        // data_resp=response['data']
        // console.log(data_resp, "response get portal users");
        // console.log(response, "response get portal users");
        // this.tableData = data_resp;
        console.log(response);
        
        this.tableData = response
        this.tableData.forEach((element, index)=>{
          // console.log(element['status'],"element table data");
          if(element['status']=="Active"){
            this.tableData[index]['status']=true;
         
          }else{
            
            this.tableData[index]['status']=false;
          }

         })
      
        this.dataSource.data = this.tableData;

      });

  }





  // cellClicked(cell){
  //   if(cell.action ==='edit') {
  //     const dialogRef = this.dialog.open(AddUserDialog, {
  //       data: cell.data
  //     });
  //     dialogRef.afterClosed().subscribe(
  //       data => {
  //         if(data) {
  //           // this.get_Portal_users();
  //         }
  //       }
  //     ); 

  //   } else {

  //   }
  //  }

  edit_low(row_data: any) {
    const dialogRef = this.dialog.open(AddUserDialog, {
      data: {
        rowdata: row_data
      }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          // this.get_Portal_users();
          let payload = {
            role:this.role_id
          };
          this.getPortalUsers(payload);
        }
      }
    );
  }


  addUser() {
    const dialogRef = this.dialog.open(AddUserDialog, {

    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          let payload = {};
          this.getPortalUsers(payload);
        }
      }
    );
  }

}
export interface User {
  portal_user_id: string;
  rowdata: string;
  name: string;
  email: string;
  orgName: string;
  mobile: string;
  role: string;
  action: 'Edit' | 'Delete';
}


@Component({
  selector: 'add-user-dialog',
  templateUrl: 'add-user-dialog.html',
  styleUrls: ['./portal-users.component.scss']
})

export class AddUserDialog {
  myForm : FormGroup;
  [x: string]: any;
  name = "";
  email = "";
  mobile = "";
  orgName = "";
  selectedrole;
  dialogTitle = "Add new user";
  portal_user_id;
  editmode;
  save_user_btn: boolean = true;
  update_user_btn: boolean = false;
  roleLabel: string = "Roles";
  rolesReference = [];
  selectedroletype = '';
  orgReference = [];

  showSpinner=false;
  
  constructor(private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User, 
    @Inject(PortalUserService) public service: PortalUserService,
    // @Inject(OnboardingService) public onboardservice:OnboardingService,
    @Inject(ToasterService) public toasterService: ToasterService,

    public dialogRef: MatDialogRef<AddUserDialog>, public serviceOrg: StateService) {
    // console.log(data, "edit dailogdata");
    if (data) {
      this.name = data.rowdata['name'];
      this.email = data.rowdata['email'];
      this.mobile = data.rowdata['mobile'];
      this.orgName = data.rowdata['org_name'];
      this.selectedrole = 1;
      // console.log(this.selectedrole,"hhd")
      // if(this.email && this.email.length > 0) {
      this.dialogTitle = "Update user";
      this.update_user_btn = true;
      this.save_user_btn = false;
      //   this.portal_user_id = data.portal_user_id;
      //   this.editmode=true;
      //   } else {
      //   this.dialogTitle="Add new user";
      //   this.editmode=false;
      // }
    } else {
      this.dialogTitle = "Add User";
      this.save_user_btn = true;
      this.update_user_btn = false;
    }

  
    this.myForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile:['', [Validators.required,Validators.minLength(10),Validators.pattern('(?=\\D*\\d).{10,10}')]],
      orgName: ['',[Validators.required]]
     });

  }

 

 

  ngOnInit() {

    let payload = {
      role: localStorage.getItem('role')
    }
    // console.log(payload, "payloadpayload roles")
    this.service.getRolesData(payload)
      .subscribe(response => {
        // console.log(response, "responseresponseresponse roles")
        this.rolesReference = response;
      });

      this.serviceOrg.getState(payload).subscribe(response =>{
        this.orgReference = response;
        
      });
  }

  // numberOnly(event: any) {
  //   const pattern = /[0-9\+\-\ ]/;
  //   let inputChar = String.fromCharCode(event.charCode);

  //   if (!pattern.test(inputChar)) {
  //     // invalid character, prevent input
  //     event.preventDefault();
  //   }
  // }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  // focusOutemail() {

  //   let email_payload = {
  //     email: this.email
  //     // orgID:localStorage.getItem("org_id"),
  //   }

  //   this.onboardservice.checkEmailexist(email_payload)
  //     .subscribe(response => {

  //       if (response == "404") {
  //         // this.emaildisabled=true;
  //         this.toasterService.pop(
  //           "error",
  //           "Email",
  //           "Email already exist"
  //         );
  //         this.save_user_btn = true;
  //       } else {
  //         this.save_user_btn = false;
  //       }
  //       //48870d105beeea41b38dda4b1add8ac3

  //     });
  // }

  // roletypeChanged(role: any) {
  //   this.selectedrole = role;
  // }

  saveUser() {
    // alert('saving');
    this.showSpinner=true;
    let payload;
    payload = {
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      org_name: this.orgName,
      role: 1,
    }
    // console.log(payload, "payload");

    if (payload.name != '' && payload.email != '' && payload.org_name != '' && payload.mobile != '' && payload.role != '') {

      // this.save_user_btn=true;
      this.service.saveuser(payload)
        .subscribe(response => {

          let data: any;
          data = response;
          // console.log(response, "incoming response")
          if (data == "200") {
            this.showSpinner=false;
            this.dialogRef.close(data);  
            this.toasterService.pop(
              "success",
              "User",
              "User added successfully"
            );
            // this.save_user_btn=false;

          } else {
            // this.getPortalUsers(payload);
            this.toasterService.pop(
              "error",
              "User",
              "User already exist"
            );
          }

        });


    } else {
      this.toasterService.pop(
        "error",
        "User",
        "Please fill all mandatory fields"
      );
      // this.save_user_btn=false;
    }

  }


  updateUser() {
    this.showSpinner=true;
    let payload = {
      userid: this.data.rowdata['id'],
      name: this.name,
      email: this.email,
      mobile: this.mobile,
      org_name: this.orgName,
      role: 1,
    }
    // console.log(payload, "payloadpayload");
    if (payload.name != '' && payload.email != '' && payload.org_name != '' && payload.mobile != '') {

      // this.save_user_btn=true;
      this.service.getUpdateUsers(payload)
        .subscribe(response => {

          let data: any;
          data = response;
          // console.log(response, "incoming response")
          if (data == "200") {
            this.showSpinner=false;
            this.dialogRef.close(data);
            this.toasterService.pop(
              "success",
              "User",
              "User updated successfully"
            );
          } else {
            // this.getUpdateUsers(payload);  
          }
        });
    } else {
      this.toasterService.pop(
        "error",
        "User",
        "Please fill all mandatory fields"
      );
    }

  }
}



@Component({
  selector: 'delete-user-dialog',
  templateUrl: 'delete-user-dialog.html',
})

export class DeleteUserDialog {
  showSpinner = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
    @Inject(PortalUserService) public service: PortalUserService,
    @Inject(ToasterService) public toasterService: ToasterService,
    public dialogRef: MatDialogRef<DeleteUserDialog>) { }
  delete_btn: boolean = false;
  ngOnInit() {
  }

  delete() {
    this.showSpinner=true;
    let payload = {
      userid: this.data.rowdata['id'],

    }
    // console.log(payload, "payloadpayload");

    // this.delete_btn=true;
    this.service.deleteUser(payload)
      .subscribe(response => {
        // console.log(response, "datadeleting");
        this.dialogRef.close(response);
        // this.delete_btn=false;   
        this.toasterService.pop(
          "success",
          "User",
          "User Deleted successfully"
        );
      });
  }
}

