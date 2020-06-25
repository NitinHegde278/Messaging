import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {ProjectCustomUtils} from '../../../../shared/helpers/ProjectCustomUtils';
import {Observable} from 'rxjs/Observable';
// import {HerdService} from '../herd.service';
import 'rxjs/add/observable/of';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit {
  src_video:any;
  safeSrc: SafeResourceUrl;
  video_title:any;
  video_description:any;

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<VideoDialogComponent>,
  private sanitizer: DomSanitizer) { 
    // console.log(data,"dialoggg dataaaaa this.src_video");
    let video_link=data.payload.video_link;
    let video_display="https://www.youtube.com/embed/"+video_link+"?controls=0&showinfo=0";
    // console.log(video_display,"video_displayvideo_display");
    // this.src_video="https://www.youtube.com/embed/EI8kGZOqsRg";
    // console.log(this.src_video,"dialoggg dataaaaa this.src_video");
    this.src_video =  this.sanitizer.bypassSecurityTrustResourceUrl(video_display);
    this.video_title=data.payload.title;
    this.video_description=data.payload.description;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
