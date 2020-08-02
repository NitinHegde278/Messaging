import { ForwardOpenDialog } from './forwarded-report/forwarded-report.component';
import { SentOpenDialog } from './sent-report/sent-report.component';
import { AdminAuthGuardService, DeniedAccess } from './auth/admin-auth-guard.service';
import { UploadDialog, Correction } from './upload-excel/upload-excel.component';
import { ForwardDialog, ForwardSuccess, ForwardConfirm } from './forward-message/forward-message.component';
import { AddOrganizationDialog } from './send-message/send-message.component';
import { SendingDialog } from './send-message/send-message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
// import {
//   MatDialogModule, MatFormFieldModule,
//   MatButtonModule, MatCardModule, MatInputModule, MatTableModule,
//   MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatTableDataSource,
//   MatSortModule, MatPaginatorModule, MatSlideToggleModule
// } from '@angular/material';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';


import { routes } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { MatVideoModule } from 'mat-video';

// import { DashboardComponent, VideoUploadDialog } from './dashboard/dashboard.component';

import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent, forgotDialog } from './login/login.component';
import { MustMatchDirective } from './helpers/must-match.directive';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PortalUsersComponent, AddUserDialog, DeleteUserDialog } from './portal-users/portal-users.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { from } from 'rxjs';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { StateComponent, AddStateDialog, DeleteStateDialog } from './state/state.component';
import { CityComponent, AddCityDialog, DeleteCityDialog } from './city/city.component';
// import {VideoDialogComponent} from '../app/video-upload/video-dialog/video-dialog.component'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TokenExpiredDialog } from './auth/auth.guard';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {RequestInterceptor,tokenDialog} from '../app/helpers/request.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {ProjectCustomUtils} from '../app/helpers/ProjectCustomUtils';
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SetPasswordComponent } from './reset-password/set-password/set-password.component';




export function jwtTokenGetter() {
  return localStorage.getItem(ProjectCustomUtils.projectJWTToken)
}




@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    // MatCardTitleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    MatVideoModule,
    NgxSpinnerModule,
    MatCheckboxModule,
    // CarouselModule,
    ToasterModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    RouterModule.forRoot(routes, {useHash: false}),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    JwtModule.forRoot({
      config: {
          tokenGetter: jwtTokenGetter,
          // () => {
          //     return localStorage.getItem(ProjectCustomUtils.projectJWTToken);
          // },
          whitelistedDomains: ['http://localhost:4200'],
          blacklistedRoutes: ['/login'],
      }
  }),
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    CarouselModule,

    // MatCardTitleModule
  ],
  declarations: [
    AppComponent,
    MustMatchDirective,
    AdminLayoutComponent,
    LoginComponent,
    DeleteUserDialog,
    AddUserDialog,
    ResetPasswordComponent,
    AddStateDialog,
    DeleteStateDialog,
    AddCityDialog,
    DeleteCityDialog,
    // VideoDetailsDialog,
    forgotDialog,
    ForgotPasswordComponent,
    TokenExpiredDialog,
    DeniedAccess,
    tokenDialog,
    SetPasswordComponent,
    AddOrganizationDialog,
    SendingDialog,
    ForwardDialog,
    ForwardSuccess,
    ForwardConfirm,
    UploadDialog,
    Correction,
    SentOpenDialog,
    ForwardOpenDialog
    
    // CityComponent,
    // VideoUploadComponent,
    // StateComponent
    // PortalUsersComponent


  ],
  entryComponents: [
    DeleteUserDialog,
    AddUserDialog,
    AddStateDialog,
    DeleteStateDialog,
    AddCityDialog,
    DeleteCityDialog,
    forgotDialog,
    TokenExpiredDialog,
    DeniedAccess,
    tokenDialog,
    AddOrganizationDialog,
    SendingDialog,
    ForwardDialog,
    ForwardSuccess,
    ForwardConfirm,
    UploadDialog,
    Correction,
    SentOpenDialog,
    ForwardOpenDialog

    // VideoDetailsDialog,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true,
},
{provide: LocationStrategy, useClass: HashLocationStrategy},
AuthGuard,AdminAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
