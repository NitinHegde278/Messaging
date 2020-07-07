import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SendingDialog } from 'app/send-message/send-message.component';
import * as XLSX from 'xlsx';
import { UploadExcelService } from './upload-excel.service';
import { ToasterService } from 'angular2-toaster';

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
 data= [];
showSpinner = false;
  constructor(private formbuilder: FormBuilder, public dialog: MatDialog, private excelService: UploadExcelService,
    @Inject(ToasterService) public toasterService: ToasterService) {
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
    this.uploaded = true;

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      // console.log(ws);
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 2 }));
      // console.log(this.data);
    };
    reader.readAsBinaryString(excelFile);
  }

  saveExcel(){
    // let dialogRef = this.dialog.open(UploadDialog, {

    // });  
    // setInterval(() => {
    //   dialogRef.close();
    // }, 3000);
    
    // dialogRef.afterClosed().subscribe(
    //   data =>{
    //   sent =true;
    //   this.dialog.open(UploadDialog, {
      
    //   });
    //   sent= false;
    // }
    // );
    this.showSpinner = true;
    console.log(this.data);
    
    this.excelService.excelData(this.data).subscribe(response => {
      if(response == "200"){
        this.showSpinner = false;
        console.log(response);
        this.toasterService.pop(
          "success",
           "Uploaded Successfully");
      } else{
        this.showSpinner = false;
        this.toasterService.pop(
          "error",
           "Something went wrong!");
      } 
    });

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
