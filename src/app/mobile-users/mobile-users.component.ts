import { Component, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MobileUserService } from 'app/mobile-users/mobile-users.service'
import { from } from 'rxjs';
import {AuthService} from '../auth/auth.service';


export interface PeriodicElement {
  id: string;
  // name: string;
  email: string;
  age: string;
  gender: string;
}
@Component({
  selector: 'app-mobile-users',
  templateUrl: './mobile-users.component.html',
  styleUrls: ['./mobile-users.component.scss']
})
export class MobileUsersComponent implements OnInit {
    tableData : PeriodicElement [] = [];
    blur_email:boolean=false;
    clear_email:boolean=false;

  displayedColumns: string[] = ['email', 'gender', 'age'];
  public dataSource = new MatTableDataSource<any>(this.tableData);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor( public service :MobileUserService,
    public authservice:AuthService) { }

  ngOnInit() {
    console.log(this.authservice.role,"mobile role id")
    let payload = {};
    this.getMobileUsers(payload);
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.dataSource.paginator = this.paginator;

    if(this.authservice.role==2){
      this.blur_email=true;
      this.clear_email=false;
    }else if(this.authservice.role==3){
      this.clear_email=true;
      this.blur_email=false;
    }

    if(this.authservice.role===undefined){
      this.authservice.role=localStorage.getItem('role');
      if(this.authservice.role==2){
        this.blur_email=true;
        this.clear_email=false;
      }else if(this.authservice.role==3){
        this.clear_email=true;
        this.blur_email=false;
      }

    }
  }
  getMobileUsers(payload) {
    this.service.getMobileUsers(payload)
      .subscribe(response => {
      this.tableData = response;
      this.tableData.forEach((element, index)=>{
        var maskid = "";
        var myemailId =  element['email'];
        var prefix= myemailId.substring(0, myemailId .lastIndexOf("@"));
        var postfix= myemailId.substring(myemailId .lastIndexOf("@"));
        for(var i=0; i<prefix.length; i++){
          if(i == 0 || i == prefix.length - 1) {   
              maskid = maskid + prefix[i].toString();
          }
          else {
              maskid = maskid + "*";
          }
        }
       maskid =maskid +postfix;
       element['maskemail']=maskid;
       })
      this.dataSource.data = this.tableData;
      })
      
    }

}