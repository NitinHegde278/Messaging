import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SendingDialog } from 'app/send-message/send-message.component';

let sent = false;
let excelFile: any;
@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css']
})
export class UploadExcelComponent implements OnInit {
  
 @ViewChild("myInput")
 myInputVariable: ElementRef;

  myForm: FormGroup;
 excel: any;
 uploaded: boolean= false;
 fileName = '';


  constructor(private formbuilder: FormBuilder, public dialog: MatDialog) {
    this.myForm = formbuilder.group({
      excel : ['']
    });
   }

  ngOnInit(): void {
     
  }
  onFileUpload(evt){
    
    this.fileName = evt.target.files[0].name;
      // evt.siblings(".custom-file-label").addClass("selected").html(fileName);
    excelFile = evt.target.files[0];
    console.log(excelFile);
    
    this.uploaded = true;
    // this.saveExcel(excelFile);
  }

  saveExcel(){
    let dialogRef = this.dialog.open(UploadDialog, {

    });  
    setInterval(() => {
      dialogRef.close();
    }, 3000);
    
    dialogRef.afterClosed().subscribe(
      data =>{
      sent =true;
      this.dialog.open(UploadDialog, {
      
      });
      sent= false;
    }
    );
    excelFile = null;
    this.myInputVariable.nativeElement.value = "";
    this.fileName = '';
    this.uploaded = false;
  }

}


@Component({
  selector: 'upload-dialog',
  templateUrl: './upload-dialog.html',
  styleUrls: ['./upload-excel.component.css']
})

export class UploadDialog{
  sending = sent;
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<UploadDialog>){ }

  ngOnInit(){

  }
}
