import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CityService } from './city.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CityUser } from './model/city';
import {
  ToasterModule,
  ToasterService,
  BodyOutputType,
  ToasterConfig
} from "angular2-toaster";
export interface PeriodicElement {
  id: string;
  state_name: string;
  cat_name: string;
  action: string;

}

const ELEMENT_DATA: PeriodicElement[] = [];



@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  tableData: CityUser[] = [];
  showportalusers: boolean;
  displayedColumns: string[] = ['position', 'state_name', 'action'];
  public dataSource = new MatTableDataSource<any>(this.tableData);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private service: CityService, public dialog: MatDialog) { }


  ngOnInit() {
    let payload = {};
    this.getCity(payload);
    // console.log(this.tableData, "table  city")

    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.dataSource.paginator = this.paginator;
  }
  delete_low(row_data: any) {
    // console.log(row_data, "row_datarow_data")
    const dialogRef = this.dialog.open(DeleteCityDialog, {
      data: {
        rowdata: row_data
      }
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          // console.log(data, "incomingdatafromdelete");
          // this.get_Portal_users();
          let data1 = {}
          this.getCity(data1);

        }

      }
    );
  }

  getCity(payload) {
    this.service.getCity(payload)
      .subscribe(response => {
        // console.log(response, "response get cat_name");
        this.tableData = response;
        // this.dataSource.push(dataSource);
        this.dataSource.data = this.tableData;

      });

  }


  edit_low(row_data: any) {
    const dialogRef = this.dialog.open(AddCityDialog, {
      data: {
        rowdata: row_data
      }
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          // this.get_Portal_users();
          let payload = {};
          this.getCity(payload);
        }
      }
    );
  }

  adduser() {
    const dialogRef = this.dialog.open(AddCityDialog, {

    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          let payload = {};
          this.getCity(payload);
        }
      }
    );
  }

}

export interface City {
  sub_id: string;
  sub_name: string;
  role: string;
  rowdata: string;
  action: 'Edit' | 'Delete';
}
@Component({
  selector: 'add-city-dialog',
  templateUrl: './add-city-dialog.html',
  styleUrls: ['./city.component.scss']
})

export class AddCityDialog {
  [x: string]: any;
  state_name = "";
  selectedrole;
  dialogTitle = "Add New City";
  editmode;
  state_id: "";
  save_city_btn: boolean = true;
  update_city_btn: boolean = false;
  roleLabel: string = "Roles";
  rolesReference = [];
  selectedroletype = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: City,
    @Inject(CityService) public service: CityService,
    @Inject(ToasterService) public toasterService: ToasterService,
    public dialogRef: MatDialogRef<AddCityDialog>) {
    // console.log(data, "edit dailogdata");
    if (data) {

      this.state_name = data.rowdata['state_name'];
      this.dialogTitle = "Update State";
      this.update_city_btn = true;
      this.save_city_btn = false;
    } else {
      this.dialogTitle = "Add State";
      this.save_City_btn = true;
      this.update_City_btn = false;
    }

  }
  ngOnInit() {
  }

  // roletypeChanged(cat_name: any) {
  //   this.selectedrole = cat_name;
  // }

  saveCity() {
    let payload;
    payload = {
      state_name: this.state_name
    }
    // console.log(payload,"payload");
    // return true;
    if (payload.state_name != ''){
      // console.log(payload,"payload");
      this.service.saveCity(payload)
        .subscribe(response => {

          let data: any;
          data = response;
          // console.log(response, "incoming response")
          if (data == "200") {
            this.dialogRef.close(data);
            //  this.getCity(payload);    
            this.toasterService.pop(
              "success",
              "State added successfully"
            );

          } else { 
            this.toasterService.pop(
              "error",
              "State already exists"
            );
          }

        });


    } else {

      this.toasterService.pop(
        "error",
        "Please fill all mandatory fields"
      );
      // this.save_user_btn=false;
    }

  }

  updateCity() {
    let payload = {
      state_id: this.data.rowdata['state_id'],
      state_name: this.state_name
    }
    if (payload.state_name != '') {
      this.service.updateCity(payload)
        .subscribe(response => {
          let data: any;
          data = response;
          if (data == "200") {
            this.dialogRef.close(data);
            this.toasterService.pop(
              "success",
              "State updated successfully"
            );
          } else {
          }
        });
    } else {
      this.toasterService.pop(
        "error",
        "Please fill all mandatory fields"
      );
    }
  }

}

@Component({
  selector: 'delete-city-dialog',
  templateUrl: './delete-city-dialog.html',
})

export class DeleteCityDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: City,
    @Inject(CityService) public service: CityService,
    @Inject(ToasterService) public toasterService: ToasterService,
    public dialogRef: MatDialogRef<DeleteCityDialog>) { }
  delete_btn: boolean = false;
  ngOnInit() {

  }

  deletecity() {
    let payload = {
      state_id: this.data.rowdata['state_id'],

    }
    this.service.deleteCity(payload)
      .subscribe(response => {
        // console.log(response, "datadeleting");
        this.dialogRef.close(response);
        this.toasterService.pop(
          "success",
          "State Deleted successfully"
        );
      });
  }
}

