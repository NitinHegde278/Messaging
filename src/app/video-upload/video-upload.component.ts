import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { VideoUploadService } from '../video-upload/video-upload.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CityService } from 'app/city/city.service';
// import { OVERLAY_CONTAINER_PROVIDER_FACTORY } from '@angular/cdk/overlay/typings/overlay-container';
import { StateService } from 'app/state/state.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToasterService } from 'angular2-toaster';
import { UrlConstants } from '../helpers/urlconstant';
import { VideoDialogComponent } from './video-dialog/video-dialog.component';
import { VideoEditDialogComponent } from './video-edit-dialog/video-edit-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';


// import {VideoUploadPlayerComponent} from '../video-upload/video-upload-player/video-upload-player.component'
// import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


export interface Video {
  cat_name: string;
  cat_id: string;
  sub_name: string;
}
declare let $: any;
@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss']
})
export class VideoUploadComponent implements OnInit {
  tabs = [];
  cat_id: '';
  selected = new FormControl(0);
  sub_namesReference = [];
  selectedcat_nametype: '';
  sub_category: boolean = false;
  videos: string = "";
  title: string = "";
  dataLength: boolean;
  showsubcategory: boolean = false;
  shownovideo: boolean = true;
  global_url = UrlConstants.MAINURL;
  showMore = false;
  showLess = false;
  user_role: any = localStorage.getItem('role');
  show_uploader: boolean = true;


  constructor(public dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document,
    public Service: CityService,
    public service: VideoUploadService,
    public router: Router,
    private SpinnerService: NgxSpinnerService) { }


  // openDetails() {
  //   // console.log(, "row_datarow_data")
  //   let dialogRef: MatDialogRef<any> = this.dialog.open(VideoDetailsDialog, {
  //   });

  //   dialogRef.afterClosed()
  //     .subscribe(res => {
  //     });
  // }

  // customOptions: OwlOptions = {
  //   loop: false,
  //   mouseDrag: false,
  //   touchDrag: false,
  //   pullDrag: false,
  //   dots: true,
  //   navSpeed: 700,

  //   // navText: ['prev', 'next'],
  //   navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
  //   // navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 2
  //     },
  //     740: {
  //       items: 3
  //     },
  //     940: {
  //       items: 3
  //     }
  //   },
  //   nav: true
  // }
  slides = [];
  slideConfig = {
    slidesToShow: 7,
    centerMode: false,
    slidesToScroll: 4,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 6000,
    speed: 3000,
    // accessibility: false,
    infinite: true,
    // changeDir: true,
    nextArrow: "<div class='nav-btn  next-slide' style='cursor:pointer;position: absolute;top: 100px !important; height: 48px;background: url(../../assets/img/75.png) no-repeat scroll 0 0;left: -3%; width:64px;'></div>",
    prevArrow: "<div class='nav-btn prev-slide ' style='cursor:pointer;position: absolute;top: 100px !important; height: 48px;background: url(../../assets/img/76.png) no-repeat scroll 0 0;left: 96%; width:64px;'></div>",
    dots: true,
    // rtl:true,
    // asNavFor: '.slider-nav',
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          centerMode: false,
          slidesToShow: 6,
        }
      },
      {
        breakpoint: 1920,
        settings: {
          centerMode: false,
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1680,
        settings: {
          centerMode: false,
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1440,
        settings: {
          centerMode: false,
          slidesToShow: 4,
        }
      },

      {
        breakpoint: 1100,
        settings: {
          centerMode: false,
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          slidesToShow: 1,
        }
      }

    ]
  };
  slickInit($event) {
  }
  breakpoint($event) {
  }
  beforeChange($event) {
  }
  afterChange($event) {
  }


  ngOnInit() {
    if (this.user_role == 4) {
      this.show_uploader = false;
    } else {
      this.show_uploader = true;
    }

    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
    }, 5000);
    // console.log(this.global_url,"dsdfsd")
    // this.isReadMore(this.videos)
    let payload = {}
    this.Service.getcat_name(payload).
      subscribe(response => {
        this.tabs = (response);
        console.log(this.tabs, "tabs content")
      });
  }
  //   openPopUp(data: any = {}, isNew?) {
  //     let title = isNew ? 'Preview Video' : 'Update Herd';
  //     let dialogRef: MatDialogRef<any> = this.dialog.open(VideoDetailsDialog, {
  //         width: '1024px',
  //         height:'500px',
  //         disableClose: true,
  //         data: {title: title, payload: 'this.videos'}
  //     });
  //     dialogRef.afterClosed()
  //         .subscribe(res => {


  //         });
  // }

  open_video_dialog(videos, isNew?) {
    let title = isNew ? 'Preview Video' : 'Update Video';
    let dialogRef: MatDialogRef<any> = this.dialog.open(VideoDialogComponent, {
      disableClose: true,
      data: { title: title, payload: videos },

    });
    dialogRef.afterClosed()
      .subscribe(res => {


      });
  }

  open_edit_dialog(videos, isNew?) {
    if (this.user_role != 4) {
      let title = isNew ? 'Edit Video Details' : 'Update Video';
      let dialogRef: MatDialogRef<any> = this.dialog.open(VideoEditDialogComponent, {
        width: '1024px',
        disableClose: true,
        data: { title: title, payload: videos },

      });
      dialogRef.afterClosed()
        .subscribe(res => {

          this.router.navigate(['/video-upload']);
          let payload1 = {}
          this.Service.getcat_name(payload1).
            subscribe(response => {
              this.tabs = (response);
              // console.log(this.tabs, "tabs content")
            });
          // this.SpinnerService.show();
          this.sub_category = true;

          let payload = {
            cat_id: localStorage.getItem('local_catid')
          }
          // console.log(payload,"payload hghghfhg")
          this.service.getvideos(payload).
            subscribe(response => {
              // console.log(response,"imcming responsee")
              if (response.length != 0) {
                this.showsubcategory = true;
                this.sub_namesReference = (response);
                this.sub_namesReference.forEach((data, index) => {
                  if (data.video.length != 0) {
                    this.shownovideo = false;
                  } else {
                    this.shownovideo = true;
                  }
                })
              } else {
                this.showsubcategory = false;
                this.shownovideo = false;
              }
              this.SpinnerService.hide();
            });
        });
    }
  }

  cat_nametypeChanged(cat_id: any) {

    this.SpinnerService.show();
    this.sub_category = true;
    this.selectedcat_nametype = this.tabs[cat_id.index].cat_id
    let payload = {
      cat_id: this.selectedcat_nametype
    }

    // console.log(payload, "payloadpayload cattype");
    localStorage.removeItem('local_catid');
    localStorage.setItem('local_catid', this.selectedcat_nametype);
    // return true;

    this.service.getvideos(payload).
      subscribe(response => {
        if (response.length != 0) {
          this.showsubcategory = true;
          this.sub_namesReference = (response);
          this.sub_namesReference.forEach((data, index) => {
            if (data.video.length != 0) {
              this.shownovideo = false;
            } else {
              this.shownovideo = true;
            }
          })
        } else {
          this.showsubcategory = false;
          this.shownovideo = false;
        }
        this.SpinnerService.hide();
      });
  }


  thumLoaded(video) {
    video['thumbLoaded'] = true;
  }

  addUser() {
    const dialogRef = this.dialog.open(VideoUploadDialog, {
      data: {
        urldata: this.global_url
      }

    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          let payload = {};

        }
      }
    );
  }
}
export interface Video {
  cat_name: string;
  cat_id: string;
  sub_name: string;
}
export interface urldata {
  globalurl: string;

}
@Component({
  selector: 'video-upload-dialog',
  templateUrl: './video-upload-dialog.html',
  styleUrls: ['./video-upload.component.scss']
})

export class VideoUploadDialog {
  banner: boolean = false;
  checked: boolean = false;
  color: 'green';
  most = "viewed";
  form: FormGroup;
  cat_name = "";
  cat_id = "";
  sub_name = "";
  uploadedvideoFiles: Array<File>;
  uploadedImageFiles: Array<File>;
  selectedcat_nametype: '';
  selectedsub_nametype: '';
  cat_namesReference = [];
  sub_namesReference = [];
  cat_nameLabel: string = "cat_names";
  sub_nameLabel: string = 'sub_names';
  progress: number = 0;
  show = false;
  btn_disabled: boolean = true;
  validate_subcategory: boolean = false;
  show_img_format: boolean = false;
  show_video_format: boolean = false;
  global_flag: any;
  video_flag: any;
  Active_state: any = "2";

  constructor(private formBuilder: FormBuilder,
    public service: VideoUploadService,
    public Service: CityService,
    @Inject(MAT_DIALOG_DATA) public data: urldata,
    @Inject(ToasterService) public toasterService: ToasterService,
    @Inject(NgxSpinnerService) private SpinnerService: NgxSpinnerService,
    private http: HttpClient) {

    this.form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      subcat: new FormControl('', Validators.required),
      video: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {

    let payload = {}
    this.Service.getcat_name(payload).
      subscribe(response => {
        this.cat_namesReference = response;
        console.log(this.cat_namesReference, "this.cat_namesReferencethis.cat_namesReference");
      });

    this.banner = true;
    this.most = "ON  : Upload to Youtube and VicFlix Server";
  }

  toggle(event) {

    // console.log(event.checked, "vhg");
    if (event.checked == true) {
      this.Active_state = "2";
      this.banner = true;
      this.most = "ON  : Upload to Youtube and VicFlix Server";
    } else {
      this.Active_state = "1";
      this.banner = false;
      this.most = "OFF : Upload to Youtube only";
    }

  }

  cat_nametypeChanged(cat_id: any) {

    this.selectedcat_nametype = cat_id.value;
    let payload = {
      cat_id: this.selectedcat_nametype
    }
    localStorage.removeItem('local_catid');
    localStorage.setItem('local_catid', this.selectedcat_nametype);
    this.service.getsub_name(payload).
      subscribe(response => {
        let subName = response.filter(sub => sub.cat_id === cat_id.value);
        this.sub_namesReference = subName;
        // console.log(this.sub_namesReference,"this.sub_namesReference")
        if (this.sub_namesReference.length == 0) {
          this.btn_disabled = true;
          this.validate_subcategory = true;
        } else {
          this.btn_disabled = false;
          this.validate_subcategory = false;
        }

        // if(this.global_flag!="1"){
        //   this.btn_disabled=false;
        // }else{
        //   this.btn_disabled=true;
        // }

      });


  }

  sub_nametypeChanged(sub_id: any) {
    this.selectedsub_nametype = sub_id.value;


  }

  onFileChange(event) {
    this.uploadedvideoFiles = event.target.files;
    console.log(event.target.files, "event.target.files video");
    // console.log(event.target.files,"video typee");
    if (event.target.files[0].type != "video/mp4" && event.target.files[0].type != "video/mpeg4" && event.target.files[0].type != "video/avi" && event.target.files[0].type != "video/wmv") {
      this.show_video_format = true;
      this.btn_disabled = true;
      this.video_flag = "0";
    } else {
      this.show_video_format = false;
      this.btn_disabled = false;
      this.video_flag = "1";
    }

  }

  onImageChange(event) {
    this.uploadedImageFiles = event.target.files;
    // console.log(event.target.files[0].type,"image typee");
    // console.log(event.target.files, "event.target.files image");
    if (event.target.files[0].type != "image/png" && event.target.files[0].type != "image/jpg" && event.target.files[0].type != "image/jpeg" && event.target.files[0].type != "image/ttf") {
      this.show_img_format = true;
      this.btn_disabled = true;
      this.global_flag = "0";
    } else {
      this.show_img_format = false;
      this.btn_disabled = false;
      this.global_flag = "1";
    }

  }

  onSubmit() {

    if (this.selectedsub_nametype === undefined) {
      this.validate_subcategory = true;
    }

    if (this.global_flag == 0 || this.video_flag == 0) {
      this.toasterService.pop(
        "error",
        "Warning",
        "Please select correct Video and Image format"
      );

    } else {

      if (this.uploadedImageFiles === undefined || this.uploadedvideoFiles === undefined) {

        this.toasterService.pop(
          "error",
          "Warning",
          "Please select Video and Image"
        );

      } else {

        if (this.form.get('title').value != "" && this.form.get('description').value != "" && this.form.get('author').value != "" && this.selectedcat_nametype !== undefined && this.selectedsub_nametype !== undefined) {
          this.btn_disabled = false;
          let formData = new FormData()
          formData.append("uploads", this.uploadedvideoFiles[0], this.uploadedvideoFiles[0].name);
          formData.append("images", this.uploadedImageFiles[0], this.uploadedImageFiles[0].name);
          formData.append("download_status", this.Active_state);
          formData.append("title", this.form.get('title').value);
          formData.append("description", this.form.get('description').value);
          formData.append("author", this.form.get('author').value);
          formData.append("cat_id", this.selectedcat_nametype);
          formData.append("sub_id", this.selectedsub_nametype);
          formData.append("user_id", localStorage.getItem('userID'));

          this.http.post('https://www.vicflix.com/upload', formData, {
            reportProgress: true,
            observe: 'events',
          })
            .subscribe(events => {
              // console.log(events, "events response");
              if (events.type == HttpEventType.UploadProgress) {
                this.progress = Math.round(events.loaded / events.total * 100);
                if (this.progress == 100) {
                  this.SpinnerService.show();
                }
                let payload = {}
                this.Service.getcat_name(payload);
              } else if (events.type === HttpEventType.Response) {
                window.location = (<any>events.body).url;
              }

            })

        } else {
          this.toasterService.pop(
            "error",
            "Warning",
            "Please select mandatory fields"
          );
        }


      }

    }


  }
}

