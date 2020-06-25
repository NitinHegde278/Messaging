import { Component, OnInit, Inject } from '@angular/core';
import { DefaultSettingsService } from 'app/default-settings/default-settings.service'
import { ToasterService } from 'angular2-toaster';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { Validators, FormBuilder, FormGroup, NgForm, FormControl,EmailValidator, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
  styleUrls: ['./default-settings.component.scss']
})
export class DefaultSettingsComponent implements OnInit {
  checked:boolean= false;
  color:'green';
  disabled:false;
  data = [];
  banner:boolean = false;
  most_viewed:any;

  constructor( public service :DefaultSettingsService,
    public toasterService:ToasterService,
    public dialog:MatDialog,
    public router: Router, ) { }

  ngOnInit() {
    let payload = {};
    this.defaultsettings(payload);
  }
  toggle(event) {
    let Active_state;
    // console.log(event.checked, "vhg");
    if (event.checked == true) {
      Active_state = "Most";
      this.banner = true;
      this.most_viewed= "ON  : Latest 5 videos will be listed on Mobile app banners";
    } else {
      Active_state = "Latest";
      this.banner = false;
      this.most_viewed="OFF :Most viewed 5 videos will be listed in Mobile app banners";
    }

    let payload = {
      Active_status: Active_state,
    }
    // console.log(payload, "ghghjg")
    this.service.defaultsettingStatus(payload)
      .subscribe(response => {
        // console.log(response,"settings response");
        this.toasterService.pop(
          "success",
          "Default Settings",
          "Default Settings updated successfully",
        );
      });
  }
  defaultsettings(payload) {
    this.service.defaultsettings(payload)
      .subscribe(response => {
        console.log(response,"response");
        this.data = response
        console.log(this.data[0].banner,"this.data[0].banner");
        if(this.data[0].banner == 'Latest'){
          this.banner = false;
          this.most_viewed="OFF :Most viewed 5 videos will be listed in Mobile app banners";
          // this.defaultsettings(payload);
        }else{
          this.banner = true;
          this.most_viewed= "ON  : Latest 5 videos will be listed on Mobile app banners";
          // this.defaultsettings(payload);
        
        }
      });

  }

  open_dialog_password(){
    
      this.dialog.open(defaultpasswordDialog,{
        data:{
          rework:"Payload"
        },
        width:'400px'
      });
    
  }

}

export interface User{
  rework:string;
}

@Component({
  selector: 'default-password-dialog',
  templateUrl: 'default-password-dialog.html',
  styleUrls: ['./default-settings.component.scss']

})

// export class MyErrorStateMatcher1 implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
//     const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

//     return (invalidCtrl || invalidParent);
//   }
// }

export class defaultpasswordDialog {
  errorMessage: string;
  resetForm: FormGroup;
  password = new FormControl('', [
    Validators.required,

  ]);

  confirmPassword = new FormControl('', [
    Validators.required
  ]);
  
  myForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  email="";
  forgotform : FormGroup;
  constructor( 
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: User,
    @Inject(DefaultSettingsService) public service:DefaultSettingsService,
    @Inject(ToasterService) public toasterService:ToasterService,
    @Inject (Router)public router: Router,
    public dialogRef: MatDialogRef<defaultpasswordDialog>) {
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

  
  onSubmit() {

    let payload = {
    
      password: this.myForm.value.password
    }
    
    if (payload.password != '') {
      // console.log(payload, "email,key,password");
      this.service.defaultPassword(payload)
        .subscribe(response => {
          let data: any;
          data = response;
          if (data == "200") {
            this.toasterService.pop(
              "success",
              "Set Password",
              "Successfully configured credentials for SMTP"
            );
            this.dialogRef.close();  
            
          } else {
            this.toasterService.pop(
              "error",
              "Set Password",
              "Entered credentials do not match with gmail account"
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

