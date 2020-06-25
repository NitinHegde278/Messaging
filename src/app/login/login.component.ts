import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl,EmailValidator, FormGroupDirective } from '@angular/forms';
import { AuthService } from 'app/auth/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { throwError, of } from 'rxjs';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';

import {
  ToasterModule,
  ToasterService,
  BodyOutputType,
  ToasterConfig
  } from "angular2-toaster";
import { ProjectCustomUtils } from 'app/helpers/ProjectCustomUtils';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup
  errorMessage : string;
  // loginMessage ='';
  email: string;
  password: string;
  isUploader = false;
  isSuperAdmin = false;
  isAdmin = false;
  signininbutton_disable:boolean=false;
  

  model: any = {};
  constructor(
    public service: LoginService,
    public router: Router,
    public authService: AuthService,
    public dialog:MatDialog,
    private toasterService: ToasterService,
    // private formBulider:FormBuilder,
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    });
    
  }

  signin() : void{

  this.signininbutton_disable = true;
    this.service.signin(this.signinForm.value.email, this.signinForm.value.password)
    .subscribe(
        response => {  
          // console.log(response, "vbdvj");     
          if(response.success && response.token) {
            // console.log(response.RawData,"response.RawDataresponse.RawData");
            localStorage.setItem("user", response.RawData[0].email);
            localStorage.setItem("name", response.RawData[0].name);
            localStorage.setItem("userID", response.RawData[0].id);
            localStorage.setItem("role", response.RawData[0].role_id);
            localStorage.setItem("status", response.RawData[0].status);
            localStorage.setItem("token", response.token);
            localStorage.setItem(ProjectCustomUtils.projectJWTToken, response.token);
             const decodedToken = ProjectCustomUtils.decodeTokenAndStoreCredentials();
            //  console.log(decodedToken,"decodedTokendecodedToken");
             if(decodedToken){
              this.authService.signin(response.RawData[0].email,response.RawData[0].role_id,response.RawData[0].name)
              .subscribe(() => {
                // console.log(this.authService.isLoggedIn,"this.authService.isLoggedIn");
                  if (this.authService.isLoggedIn){
                    // console.log(this.authService.role_id,"this.authService.role_id");
                    this.isUploader = this.authService.role_id == 1? true : false;
                    this.isSuperAdmin = this.authService.role_id == 3? true :false;
                    this.isAdmin = this.authService.role_id == 2? true:false;
                    // this.authService.incidentData.emit(response.RawData[0].role_id);
                    if(response.RawData[0].role_id == 1 || response.RawData[0].role_id == 3 || response.RawData[0].role_id == 2 ||  response.RawData[0].role_id == 4){
                      this.toasterService.pop(
                        "success",
                        "Login",
                        "Login Successfull"
                      );
                      let redirect = this.authService.redirectUrl ? this.authService.redirectUrl:'/send-message';
                      // console.log(redirect,"bdhcbh")
                      this.router.navigate([redirect]);
                    }
                   
                    
                  
                  //   if(response.RawData[0].role_id == 2){
                  //     this.toasterService.pop(
                  //       "success",
                  //       "Login",
                  //       "Successfully Login"
                  //     );
                  //     let redirect = this.authService.redirectUrl ? this.authService.redirectUrl: '/dashboard';
                  //     console.log(redirect,"bdhcbh")
                  //     this.router.navigate([redirect]);
                  //   }
                  //  this.signininbutton_disable=false;
  
                  }
                 
              });
             }
            
      
    }
    
    else{
      console.log("here");
      
      this.errorMessage = 'responce.message';
      this.toasterService.pop(
        "error",
        "login failed",
        "Invalid credentials"
      );
    }
  },
  (error:Response)=>{
    // console.log(error.status,"dgbdb");
    if(error.status == 0){
      this.errorMessage = 'Not found';
    }
    else{
      this.toasterService.pop(
        "error",
        "login failed",
        "please fill all credentials"
      );
      this.errorMessage = 'Unexpected error occured';
    }
    this.signininbutton_disable = false; 
      }
    );
  }



  logout(){
    this.authService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("status");
    localStorage.removeItem("token");
    this.service.clearMessage();
  }

  open_forgot_dialog(){
    this.dialog.open(forgotDialog,{
      data:{
        rework:"Payload"
      }
    });
  }
}

export interface User{
  rework:string;
}

@Component({
  selector: 'forgot-password-dialog',
  templateUrl: 'forgot-password-dialog.html',
  styleUrls: ['./login.component.scss']

})
export class forgotDialog {

  email="";
  showSpinner=false;
  forgotform : FormGroup;
  constructor( private formBuilder : FormBuilder,@Inject(MAT_DIALOG_DATA) public data: User,
  @Inject(LoginService) public service:LoginService,
  @Inject(ToasterService) public toasterService:ToasterService,
  @Inject (Router)public router: Router,
  public dialogRef: MatDialogRef<forgotDialog>) {
    this.forgotform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  check_email(){
    
   this.showSpinner=true;
   let payload={
     email:this.email
   }

   this.service.checkemail(payload)
   .subscribe(response => {
    // console.log(response,"csjjhscuyfdas");
     let data:any;
     data=response;
     if(data=="200"){
      this.router.navigate(['./forgotpassword']);
      this.toasterService.pop(
        "success",
        "Email",
        "Email has been sent"
      );
      this.dialogRef.close();
     }else{
      this.showSpinner = false;
      this.toasterService.pop(
        "error",
        "Email",
        "Email does not exist"
      );
     }
    
   });

  }

}

