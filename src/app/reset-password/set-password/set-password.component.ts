import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, EmailValidator, FormBuilder, MinLengthValidator } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { setService } from './set-password.service';
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
import { error } from 'protractor';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

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
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public service: setService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(ToasterService) public toasterService: ToasterService,
    private route: ActivatedRoute,
  ) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^!@#$%^&*?]*[!@#$%^&*?]).{8,30}')]],
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
            //   "Warning",
            //   "Set password",
            // );
          }
        },
        error => {
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
      password: this.myForm.value.password
    }
    if (payload.password != '') {
      this.service.updatePassword(payload)
        .subscribe(response => {
          let data: any;
          data = response;
          if (data == "200") {
            this.toasterService.pop(
              "success",
              "Set Password",
              "Password updated successfully"
            );
            this.router.navigate(['../']);
          } else {
            this.toasterService.pop(
              "error",
              "Warning",
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
