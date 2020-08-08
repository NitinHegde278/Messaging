import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, EmailValidator, FormBuilder, MinLengthValidator } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { resetService } from './reset-password.service';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';
// import { AuthService } from 'src/app/auth/auth.service';
// import { checkAndUpdateElementInline } from '@angular/core/src/view/element';
import { ActivatedRoute } from '@angular/router';
import {
  ToasterModule,
  ToasterService,
  BodyOutputType,
  ToasterConfig
} from "angular2-toaster";
import { UpperCasePipe, LowerCasePipe } from '@angular/common';

/** Error when invalid control is dirty, touched, or submitted. */
// export class LoginErrorStateMatcher implements ErrorStateMatcher {

//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  errorMessage: string;
  resetForm: FormGroup;
  email = "";
  key = "";
  // orgID="";
  password = new FormControl('', [
    Validators.required,

  ]);

  confirmPassword = new FormControl('', [
    Validators.required
  ]);

  // matcher = new LoginErrorStateMatcher();
  // constructor(private router: Router, 
  //   private formBuilder: FormBuilder,
  //   // public authService: AuthService,
  //   public service: resetService,
  //   private route: ActivatedRoute,
  //   private toasterService: ToasterService,) { 

  //   this.resetForm = this.formBuilder.group({
  //     confirmpassword: this.confirmpasswordFormControl, 
  //     password: this.passwordFormControl 
  //   });

  // }

  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder,
    public service: resetService,
    // public authService: AuthService,
    private router: Router,
    @Inject(ToasterService) public toasterService: ToasterService,
    private route: ActivatedRoute,

  ) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required,Validators.minLength(8),Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^!@#$%^&*?]*[!@#$%^&*?]).{8,30}')]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }



  ngOnInit() {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.key = this.route.snapshot.queryParamMap.get('id');
    // console.log(this.email, this.key, "incoming email & key");
    // this.orgID= this.route.snapshot.queryParamMap.get('orgID');
    this.router.navigate(['.'], { relativeTo: this.route, queryParams: {} });
    if (this.email && this.key) {

      let payload = {

        email: this.email,
        token: this.key,
        // orgID:this.orgID
      }
      // console.log(payload, "incoming email&key");
      this.service.checkReset(payload)
        .subscribe(response => {
          let data: any;
          data = response;
          console.log(data);
          
          // console.log(data, "incoming key")
          if (data == 200) {
            this.router.navigate(['../']);
          }
          else {
            // this.toasterService.pop(
            //   "error",
            //   "Reset Password",
            //   "set password",
            // );
          }
        },
        (error) => {
          console.log(error);
          
          if(error.status == 404){
            this.toasterService.pop(
              "error",
              "User Not Found",
            );
            this.router.navigate(['../']);
          }
        });

    }

  }



  onSubmit() {

    let payload = {
      email: this.email,
      token: this.key,
      // orgID:this.orgID,
      password: this.myForm.value.password
    }
    if (payload.password != '') {
      // console.log(payload, "email,key,password");
      this.service.updatePassword(payload)
        .subscribe(response => {
          let data: any;
          data = response;
          if (data == "200") {
            this.toasterService.pop(
              "success",
              "Reset Password",
              "Password updated successfully"
            );
            this.router.navigate(['../']);
          } else {
            this.toasterService.pop(
              "error",
              "Reset Password",
              "Password Not updated successfully"
            );
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
