import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import {AbstractControl, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
// import {ProjectCustomUtils} from '../../../../shared/helpers/ProjectCustomUtils';
import {Observable} from 'rxjs/Observable';
// import {HerdService} from '../herd.service';
import 'rxjs/add/observable/of';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UrlConstants } from '../../helpers/urlconstant';
import { VideoUploadService } from '../../video-upload/video-upload.service';
import {
  ToasterModule,
  ToasterService,
  BodyOutputType,
  ToasterConfig
  } from "angular2-toaster";
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  public modal_name=UrlConstants.modal_name;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(ToasterService) public toasterService:ToasterService,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public service: VideoUploadService,
    public dialog: MatDialog,
    public router:Router,
  ) { }

  ngOnInit() {
  }

  delete(){
    // console.log(this.data.payload,"delete dialog data")
    let payload={
      video_id:this.data.payload.video_id,
    }
    // console.log(payload,"denjdn")
    this.service.delete_video(payload).
      subscribe(response => {
        // console.log(response,"delete");
        if(response){
          this.toasterService.pop(
            "success",
            "Video Detele",
            "Video Deleted successfully"
          );
          this.dialogRef.close(response);
          this.router.navigate(['/video-upload']);
        }else{
          this.toasterService.pop(
            "error",
            "Video Detele",
            "Video Detele Not updated successfully"
          );
        }
        
       
      });
  }

}
