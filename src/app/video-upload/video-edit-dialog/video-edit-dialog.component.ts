import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import {ProjectCustomUtils} from '../../../../shared/helpers/ProjectCustomUtils';
import { Observable } from 'rxjs/Observable';
// import {HerdService} from '../herd.service';
import 'rxjs/add/observable/of';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UrlConstants } from '../../helpers/urlconstant';
import { VideoUploadService } from '../../video-upload/video-upload.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import {
  ToasterModule,
  ToasterService,
  BodyOutputType,
  ToasterConfig
} from "angular2-toaster";
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-video-edit-dialog',
  templateUrl: './video-edit-dialog.component.html',
  styleUrls: ['./video-edit-dialog.component.scss']
})
export class VideoEditDialogComponent implements OnInit {
  src_video: any;
  safeSrc: SafeResourceUrl;
  video_title: any;
  video_description: any;
  thumbnail_src: any;
  global_url: any;
  Title = "";
  Description = "";
  likes: any;
  dislikes: any;
  views: any;
  shares_video: any
  canEditCode: boolean = false;
  canEditlabel: boolean = true;
  uploadedImageFiles: Array<File>;
  form: FormGroup;
  nohrline: boolean = true;
  hr_hide: boolean = true;
  show_img_format:boolean=false;



  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(ToasterService) public toasterService: ToasterService,
    public dialogRef: MatDialogRef<VideoEditDialogComponent>,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public service: VideoUploadService,
    public dialog: MatDialog,
    public http: HttpClient,
    public router: Router,
    private SpinnerService: NgxSpinnerService
  ) {
    //  console.log(this.global_url,'njdfj')
    this.global_url = UrlConstants.MAINURL;
    this.video_title = data.payload.title;
    this.video_description = data.payload.description;
    this.thumbnail_src = this.global_url + data.payload.thumbnail;
    this.likes = data.payload.likes;
    this.dislikes = data.payload.dislikes;
    this.views = data.payload.views;
    this.shares_video = data.payload.share;

    this.form = this.formBuilder.group({
      Title: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
    });
  }


  ngOnInit() {

    // this.service.getsub_name(payload).
    //   subscribe(response => {
    //     console.log(response, "sub_name");
    //     let subName = response.filter(sub => sub.cat_id === cat_id.value);
    //     this.sub_namesReference = subName;
    //     console.log(subName, "resuuuuuu");
    //   });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit_low() {

    this.form = this.formBuilder.group({
      Title: new FormControl(this.video_title, Validators.required),
      Description: new FormControl(this.video_description, Validators.required),
      // author: new FormControl('', Validators.required),
    });

    // this.canEditCode=true;
    // this.canEditlabel=false;
    this.canEditCode = !this.canEditCode;
    this.hr_hide = false;
    this.nohrline = ! this.nohrline;

    // this.Title=this.video_title;
    // this.Description=this.video_description;
  }

  delete_low(isNew?) {
    // console.log(this.data,"delete data");
    let title = isNew ? 'Edit Video Details' : 'Update video';
    let dialogRef: MatDialogRef<any> = this.dialog.open(DeleteDialogComponent, {
      // width: '1024px',
      // height:'500px',
      disableClose: true,
      data: { title: title, payload: this.data.payload },

    });
    dialogRef.afterClosed()
      .subscribe(res => {
        this.router.navigate(['/video-upload']);
        this.dialogRef.close();

      });
    // console.log(videos,"open video dialog");
  }

  onImageChange(event) {
    this.uploadedImageFiles = event.target.files;
    
    if(event.target.files[0].type!="image/png" && event.target.files[0].type!="image/jpg" && event.target.files[0].type!="image/jpeg" && event.target.files[0].type!="image/ttf"){
      this.show_img_format=true;
    }else{
      this.show_img_format=false;
    }

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        // this.canEditCode=true;
        this.thumbnail_src = "";
        this.thumbnail_src = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

  }

  update() {
    this.SpinnerService.show();
    this.nohrline = false;
    console.log(this.uploadedImageFiles, "this.uploadedImageFiles[0]");

    // console.log(this.uploadedImageFiles[0].name,"this.uploadedImageFiles[0].name");
    let formData = new FormData();
    if (this.uploadedImageFiles != undefined) {
      formData.append("images", this.uploadedImageFiles[0], this.uploadedImageFiles[0].name);
    }

    console.log(this.form.get('Title').value, this.form.get('Title').value, "title description");
    

if(this.form.get('Title').value!="" && this.form.get('Description').value!=""){

    formData.append("Title", this.form.get('Title').value);
    formData.append("Description", this.form.get('Description').value);
    formData.append("video_id", this.data.payload.video_id)
    console.log(formData, "formDataformData");
    // return true;
    this.http.post(this.global_url + 'portal/users/updatevinfo', formData).subscribe(
      (response => {
        if (response) {
          // console.log(response,"response");
          this.video_title = response['title'];
          this.video_description = response['des'];
          this.canEditCode = false;
          this.nohrline = true;
          this.SpinnerService.hide();
          this.toasterService.pop(
            "success",
            "Video Details",
            "Video Details updated successfully"
          );
        }

      })

    )
  }else{
    this.toasterService.pop(
      "error",
      "Video Details",
      "Please fill all mandatory fields"
    );
  }


  }

  cancel() {
    // console.log("cancel button called")
    this.canEditCode = false;
    this.hr_hide = true;
    this.nohrline = ! this.nohrline;
  }

  close_modal(){
    this.router.navigate(['./video-upload']);
  }
}
