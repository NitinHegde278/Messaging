import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, EmailValidator, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { throwError, of } from 'rxjs';
// import { AuthService } from 'src/app/auth/auth.service';
// import { checkAndUpdateElementInline } from '@angular/core/src/view/element';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-upload-response',
  templateUrl: './upload-response.component.html',
  styleUrls: ['./upload-response.component.scss']
})
export class UploadResponseComponent implements OnInit {

  status_msg="";
  id_val="";
  display_msg="";
  upload_fail:boolean=false;
  upload_quota:boolean=false;
  upload_success:boolean=false;
  upload_another:boolean=false;

  constructor(
    private route: ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit() {
    this.id_val = this.route.snapshot.queryParamMap.get('id');
    this.status_msg = this.route.snapshot.queryParamMap.get('ch');
    // console.log(this.id_val,"getting id value");
    // console.log(this.status_msg,"getting status msg value");
   
    if(this.id_val=="1"){
      this.upload_fail=true;
    }else if(this.id_val=="2"){
      this.upload_quota=true;
    }else if(this.id_val=="3"){
      this.upload_another=true;
    }else if(this.id_val=="4"){
      this.upload_success=true;
    }
  }

  redirect_link(){
    this.router.navigate(['./video-upload']);
  }

}
