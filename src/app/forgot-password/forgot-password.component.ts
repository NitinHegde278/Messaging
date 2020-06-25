import { Component, OnInit } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public router: Router,) { }

  ngOnInit() {
  }

  signin(){

    this.router.navigate(['../']);
  }

}
