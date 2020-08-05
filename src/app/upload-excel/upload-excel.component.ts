import { StateService } from 'app/state/state.service';
import { CorrectionResponse } from './model/correction-response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SendingDialog } from 'app/send-message/send-message.component';
import * as XLSX from 'xlsx';
import { UploadExcelService } from './upload-excel.service';
import { ToasterService } from 'angular2-toaster';
import { SendingTable } from 'app/send-message/model/sendingTable';
import { CityService } from 'app/city/city.service';

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
    if(evt.target.files.length > 0){
      if(evt.target.files[0].name.includes(".xlsx") || evt.target.files[0].name.includes(".xls")){
    this.fileName = evt.target.files[0].name;
      // evt.siblings(".custom-file-label").addClass("selected").html(fileName);
    excelFile = evt.target.files[0];

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname : string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 2 }));
      console.log(this.data);
      if(this.data[0]['Full_Name'] && this.data[0]['Phone'] && this.data[0]['Home_State'] && 
      this.data[0]['Work_State'] && this.data[0]['Occupation'] && this.data[0]['Gender'] && this.data[0]['Age']
      && this.data[0]['Alt_Phone']){
        this.uploaded = true;
      }else{
        this.uploaded = false;
        this.toasterService.pop(
          "error",
          "Header Labels do not match",
          "Please download Template Excel sheet and use the column headers"
        );
      }
    };
    reader.readAsBinaryString(excelFile);
  }else{
    this.toasterService.pop(
      "error",
      "Not supported",
      "Please choose excel document with .xlsx or .xls extension"
    );
  }
}
  
  }

  saveExcel(){
    
    this.showSpinner = true;
    console.log(this.data);
    
    this.excelService.excelData(this.data).subscribe(response => {
      console.log(response);
      
      if(response.mis_st_json[0]){
        this.showSpinner = false;
        
        const dialogRef = this.dialog.open(Correction,{
          data : {
            rowData: response
          },
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(data =>{
          this.toasterService.pop(
            "success",
            "Updated successfully"
          );
        });
      } else{
       
          this.showSpinner = false;
          console.log("from if");
          this.toasterService.pop(
            "success",
             "Uploaded Successfully");
        
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


@Component({
  selector: 'correction',
  templateUrl: './correction.html',
  styleUrls: ['./upload-excel.component.css']
})

export class Correction{
  myForm : FormGroup;
  fullName = "";
  homeState = "";
  element = [];
  error_values = [];
  stateList = [];
  selectedStates = [];
  dialogTitle = "These states are not matching with our Database. Please choose the right states";
  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog, public dialogRef: MatDialogRef<Correction>,
    @Inject(MAT_DIALOG_DATA) public data: any, private stateService: CityService,
    private excelService: UploadExcelService,
    @Inject(ToasterService) public toasterService: ToasterService){ 
      this.element = data.rowData['mis_st_json'];
      this.error_values = data.rowData['err_values'];
      this.myForm = this.formBuilder.group({
        states: ['',[Validators.required]]
      });

    }

  ngOnInit(){
    let payload={};
    this.stateService.getCity(payload).subscribe(response =>{
      this.stateList = response;
    });
  }
  saveStates(){
    console.log(this.selectedStates);
    let mis_st_json = [];
    this.element.forEach(obj =>{
       mis_st_json.push({
         mis_state: obj.mis_state,
         state_id: this.selectedStates[0]
       });
       this.selectedStates.shift();
    });

    let payload = {
      err_values: this.error_values,
      mis_st_json: mis_st_json
    }
    console.log("payload",payload);
    this.excelService.excelCorrection(payload).subscribe(response => {
     console.log("inside response",response);
     
      if(response == "OK"){
        this.dialogRef.close();
      }else{
        this.toasterService.pop(
          "error",
          "Updation failed. Try again"
        );
      }
    });
    
  }
  check(){
    let checking = this.selectedStates.filter(obj => obj != undefined);
    if(checking.length == this.element.length){
      return false;
    }else{
      return true;
    }
  }
}
