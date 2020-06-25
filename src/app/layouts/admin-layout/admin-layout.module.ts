import { TotalMessagesComponent } from './../../total-messages/total-messages.component';
import { ExcelReportComponent } from './../../excel-report/excel-report.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';

// import {
//   MatButtonModule,
//   MatInputModule,
//   MatRippleModule,
//   MatFormFieldModule,
//   MatTooltipModule,
//   MatSelectModule,
//   MatCardModule,
//   MatTableModule,
//   MatTableDataSource,
//   MatSortModule,
//   MatIconModule,
//   MatDividerModule,
//   MatSlideToggleModule,

// } from '@angular/material';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
// import {} from '@angular/material/grid-tile';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PortalUsersComponent,DeleteUserDialog,AddUserDialog } from 'app/portal-users/portal-users.component';
import { from } from 'rxjs';
import { ResetPasswordComponent } from 'app/reset-password/reset-password.component';
import { StateComponent } from 'app/state/state.component';
import { CityComponent } from 'app/city/city.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
// import { FileUploader } from 'ng2-file-upload';
// import { MatFileUploadModule ,FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
// import { BrowserModule } from '@angular/platform-browser';
// import { MatFileUploadModule } from '@webacad/ng-mat-file-upload';
// import { MatFileUploadModule,BrowserModule }
import { VideoUploadComponent } from 'app/video-upload/video-upload.component';
import { ReadMoreComponent } from 'app/read-more/read-more';
import { MobileUsersComponent } from 'app/mobile-users/mobile-users.component'
import { DefaultSettingsComponent, defaultpasswordDialog } from 'app/default-settings/default-settings.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TextShowMoreLessModule } from 'angular2-text-show-more-less';
import { UploadResponseComponent } from 'app/video-upload/upload-response/upload-response.component';
import { SendMessageComponent } from '../../send-message/send-message.component';
import { UploadExcelComponent } from '../../upload-excel/upload-excel.component';
import { ForwardMessageComponent } from '../../forward-message/forward-message.component';
import { SentReportComponent } from '../../sent-report/sent-report.component';
import { ForwardedReportComponent } from '../../forwarded-report/forwarded-report.component';

@NgModule({
  imports: [
    CommonModule,
    // FontAwesomeModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatPaginatorModule,
    HttpClientModule,
    MatDividerModule,
    MatTabsModule,
    MatGridListModule,
    MatSlideToggleModule,
    CarouselModule,
    SlickCarouselModule,
    NgxSpinnerModule,
    TextShowMoreLessModule,


    // FileUploader,
    // MatFileUploadModule,

  ],
  declarations: [
    DashboardComponent,
    PortalUsersComponent,
    StateComponent,
    CityComponent,
    VideoUploadComponent,
    ReadMoreComponent,
    MobileUsersComponent,
    DefaultSettingsComponent,
    UploadResponseComponent,
    SendMessageComponent,
    UploadExcelComponent,
    ForwardMessageComponent,
    SentReportComponent,
    ForwardedReportComponent,
    ExcelReportComponent,
    TotalMessagesComponent
    // defaultpasswordDialog
    // VideoDetailsDialog
    // VideouploadComponent
    // ResetPasswordComponent
    

  ],
  entryComponents:[
    // VideoDetailsDialog
    // defaultpasswordDialog
  ],
})

export class AdminLayoutModule {}
