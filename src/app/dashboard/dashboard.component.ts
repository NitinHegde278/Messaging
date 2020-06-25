import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, 
  MatDialogRef,  } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Routes, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tableData: [];
  total_likes:any;
  total_dislikes:any;
  total_viewes:any;
  total_shares:any;
  total_downloads:any;
  total_users:any;

  constructor(
    public service: DashboardService,
  ) { }
  ngOnInit() {
    let payload = {};
    this.getlikes(payload);
  }
  getlikes(payload) {
    this.service.getlikes(payload)
      .subscribe(response => {
        console.log(response, "response get analytics");
        // this.tableData = response;
        this.total_likes=response[0].total_likes;
        this.total_dislikes=response[0].total_dislikes;
        this.total_viewes=response[2].total_views;
        this.total_downloads=response[0].total_downloads;
        this.total_shares=response[0].total_share;
        this.total_users=response[1].tota_users;

        // console.log(this.total_likes,"this.total_likes");
        if(this.total_likes===null){
          this.total_likes=0;
        }
        if(this.total_dislikes===null){
          this.total_dislikes=0;
        }
        if(this.total_viewes===null){
          this.total_viewes=0;
        }
        if(this.total_downloads===null){
          this.total_downloads=0;
        }
        if(this.total_shares===null){
          this.total_shares=0;
        }
        if(this.total_users===null){
          this.total_users=0;
        }


      });

  }
}