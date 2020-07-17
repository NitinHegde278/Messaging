import { AdminAuthGuardService } from './../../auth/admin-auth-guard.service';
import { TotalMessagesComponent } from './../../total-messages/total-messages.component';
import { ExcelReportComponent } from './../../excel-report/excel-report.component';
import { ForwardedReportComponent } from './../../forwarded-report/forwarded-report.component';
import { SentReportComponent } from './../../sent-report/sent-report.component';
import { ForwardMessageComponent } from './../../forward-message/forward-message.component';
import { UploadExcelComponent } from './../../upload-excel/upload-excel.component';
import { SendMessageComponent } from './../../send-message/send-message.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { PortalUsersComponent } from 'app/portal-users/portal-users.component';
import { ResetPasswordComponent } from 'app/reset-password/reset-password.component';
import { StateComponent } from 'app/state/state.component';
import { CityComponent } from 'app/city/city.component';
import { VideoUploadComponent } from 'app/video-upload/video-upload.component';
import { MobileUsersComponent } from 'app/mobile-users/mobile-users.component';
import { DefaultSettingsComponent } from 'app/default-settings/default-settings.component';
import { UploadResponseComponent } from 'app/video-upload/upload-response/upload-response.component';
// import { AdminLayoutComponent } from './admin-layout.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'video-upload', component: VideoUploadComponent },
    { path: 'portal-users', component: PortalUsersComponent, canActivate: [AdminAuthGuardService] },
    { path: 'mobile-users', component: MobileUsersComponent },
    { path: 'default-settings', component: DefaultSettingsComponent },
    { path: 'organization', component: StateComponent, canActivate: [AdminAuthGuardService]},
    { path: 'state', component: CityComponent, canActivate: [AdminAuthGuardService] },
    { path: 'video-response', component: UploadResponseComponent },
    {path: 'send-message', component: SendMessageComponent},
    {path: 'upload-excel', component: UploadExcelComponent},
    {path: 'forward-message', component: ForwardMessageComponent},
    {path: 'sent-report', component: SentReportComponent},
    {path: 'forwarded-report', component: ForwardedReportComponent},
    {path: 'excel-report', component: ExcelReportComponent},
    {path: 'total-messages', component: TotalMessagesComponent,canActivate: [AdminAuthGuardService]}
];
