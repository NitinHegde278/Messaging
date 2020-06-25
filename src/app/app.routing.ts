import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth/auth.guard'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SetPasswordComponent } from './reset-password/set-password/set-password.component';


export const routes: Routes =[

  { path: '',
  component: LoginComponent , 
  pathMatch: 'full'
},
{
  path:'resetpassword',
  component: ResetPasswordComponent , 
  pathMatch: 'full'
},
{
  path:'setpassword',
  component: SetPasswordComponent , 
  pathMatch: 'full'
},
{
  path:'forgotpassword',
  component:ForgotPasswordComponent,
  pathMatch:'full',
},
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

// @NgModule({
//   imports: [
//     CommonModule,
//     BrowserModule,
//     RouterModule.forRoot(routes,{
//        useHash: true
//     })
//   ],
//   exports: [
//   ],
// })

// export class AppRoutingModule { }
