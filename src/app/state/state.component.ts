import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { StateService } from './state.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { StateUser } from './model/state';
import {
  ToasterModule,
  ToasterService,
  BodyOutputType,
  ToasterConfig
} from "angular2-toaster";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export interface PeriodicElement {
  id: string;
  state_name: string;
  action: string;

}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  tableData: StateUser[] = [];
  showportalusers: boolean;

  displayedColumns: string[] = ['position','org_name', 'action'];
  public dataSource = new MatTableDataSource<any>(this.tableData);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: StateService, public dialog: MatDialog) { }

  ngOnInit() {
    let payload = {};
    this.getState(payload);
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.dataSource.paginator = this.paginator;
  }
  delete_low(row_data: any) {
    const dialogRef = this.dialog.open(DeleteStateDialog, {
      data: {
        rowdata: row_data
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          let data1 = {}
          this.getState(data1);

        }

      }
    );
  }



  getState(payload) {
    this.service.getState(payload)
      .subscribe(response => {
        // console.log(response, "response get States");
        this.tableData = response;
        this.dataSource.data = this.tableData;

      });

  }

  edit_low(row_data: any) {
    const dialogRef = this.dialog.open(AddStateDialog, {
      data: {
        rowdata: row_data
      }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          let payload = {};
          this.getState(payload);
        }
      }
    );
  }
  adduser() {
    const dialogRef = this.dialog.open(AddStateDialog, {

    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          let payload = {};
          this.getState(payload);
        }
      }
    );
  }

}
export interface State {
  org_id: string;
  org_name: string;
  rowdata: string;
  action: 'Edit' | 'Delete';
}
@Component({
  selector: 'add-state-dialog',
  templateUrl: './add-state-dialog.html',
  styleUrls: ['./state.component.scss']
})

export class AddStateDialog {
  [x: string]: any;
  myForm : FormGroup;
  org_name = "";
  dialogTitle = "Add new Organization";
  editmode;
  org_id: "";
  save_state_btn: boolean = true;
  update_state_btn: boolean = false;
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: State,
    @Inject(StateService) public service: StateService,
    @Inject(ToasterService) public toasterService: ToasterService,
    public dialogRef: MatDialogRef<AddStateDialog>) {

      // this.myForm = this.formBuilder.group({
      //   category: ['',[Validators.required]],
       
      //  });
    // console.log(data, "edit dailogdata");
    if (data) {
      this.org_name = data.rowdata['org_name'];
      this.dialogTitle = "Update Organization";
      this.update_state_btn = true;
      this.save_state_btn = false;
    } else {
      this.dialogTitle = "Add Organization";
      this.save_state_btn = true;
      this.update_state_btn = false;
    }

  }
  ngOnInit() {
  }

  saveState() {
    let payload;
    payload = {
      org_name: this.org_name
    }
    
    if (payload.org_name != '') {
      this.service.saveState(payload)
        .subscribe(response => {
          let data: any;
          data = response;
          if (data == "200") {
            this.dialogRef.close(data);
            this.toasterService.pop(
              "success",
              "Organization added successfully"
            );
            
          } else {
            this.toasterService.pop(
              "error",
              "Organization Already Exists"
            );
          }
        });
        
    } else {
      this.toasterService.pop(
        "error",
        "Please Add Organization"
      );
    }
   
  }

  updateState() {
    let payload = {
      org_id: this.data.rowdata['org_id'],
      org_name: this.org_name
    }
    // console.log(payload, "payloadpayload");
    if (payload.org_name != '') {
      this.service.updateState(payload)
        .subscribe(response => {
          let data: any;
          data = response;
          // console.log(response, "incoming response")
          if (data == "200") {
            this.dialogRef.close(data);
            this.toasterService.pop(
              "success",
              "Organization Edited successfully"
            );
          } else {
            this.toasterService.pop(
              "success",
              "Organization Not Edited successfully"
            );
          }
        });
    } else {
      this.toasterService.pop(
        "error",
        "Please Add Organization"
      );
    }
  }
}
@Component({
  selector: 'delete-state-dialog',
  templateUrl: './delete-state-dialog.html',
})

export class DeleteStateDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: State,
    @Inject(StateService) public service: StateService,
    @Inject(ToasterService) public toasterService: ToasterService,
    public dialogRef: MatDialogRef<DeleteStateDialog>) { }
  delete_btn: boolean = false;
  ngOnInit() {

  }

  deletestate() {
    let payload = {
      org_id: this.data.rowdata['org_id'],

    }
    // console.log(payload, "payloadpayload");

    // this.delete_btn=true;
    this.service.deleteState(payload)
      .subscribe(response => {
        // console.log(response, "datadeleting");
        this.dialogRef.close(response);
        // this.delete_btn=false;   
        this.toasterService.pop(
          "success",
          "Organization deleted successfully"
        );
      });
  }
}
