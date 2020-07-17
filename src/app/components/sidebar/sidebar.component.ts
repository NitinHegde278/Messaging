import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {AuthService} from '../../auth/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [


  { path: '/dashboard', title: 'Analytics',  icon: 'dashboard', class: '' },
  { path: '/video-upload', title:'Videos', icon :'cloud_upload', class:''},
  { path: '/portal-users', title: 'Organization-Users',  icon:'person', class: '' },
  { path: '/mobile-users', title: 'Mobile-Users',  icon:'portrait', class: '' },
  { path: '/default-settings', title: 'Default-Settings',  icon:'settings', class: '' },
  { path: '/organization', title: 'Organization',  icon:'location_on', class: '' },
  { path: '/state', title: 'States',  icon:'location_on', class: '' },
  { path: '/send-message', title: 'Send Messages',  icon:'location_on', class: '' },
  { path: '/upload-excel', title: 'Upload Excel',  icon:'location_on', class: '' },
  { path: '/forward-message', title: 'Forward Request',  icon:'location_on', class: '' },
  { path: '/sent-report', title: 'Sent-Messages',  icon:'location_on', class: '' },
  { path: '/forwarded-report', title: 'Forwarded-Messages',  icon:'location_on', class: '' },
  { path: '/excel-report', title: 'Excel-Upload Report',  icon:'location_on', class: '' },
  { path: '/total-messages', title: 'Total Messages Sent',  icon:'location_on', class: '' }
  
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav',{static:true}) sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  menuItems: any[];
  admin_list:boolean=true;
  uploader:boolean=false;
  super_admin_list :boolean =false;

  constructor(public service:AuthService) { }

  ngOnInit() {
    if(this.service.role=='U'){
      this.uploader=true;
      this.admin_list=false;
      this.super_admin_list = false;
    }else if(this.service.role=='A'){
      this.super_admin_list = true;
      this.admin_list=false;
      this.uploader=false;
    }

    if(this.service.role===undefined){
      this.service.role=localStorage.getItem('role');
      // console.log(this.service.role,"undefined this.service.role")
      if(this.service.role=='U'){
        this.uploader=true;
        this.admin_list=false;
        this.super_admin_list = false;
      }
      else if(this.service.role=='A'){
        this.super_admin_list = true;
        this.admin_list=false;
        this.uploader=false;
      }
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
