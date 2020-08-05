import { AdminAuthGuardService } from './../../auth/admin-auth-guard.service';
import { ExcelReportComponent } from './../../excel-report/excel-report.component';
import { ForwardedReportComponent } from './../../forwarded-report/forwarded-report.component';
import { SentReportComponent } from './../../sent-report/sent-report.component';
import { ForwardMessageComponent } from './../../forward-message/forward-message.component';
import { UploadExcelComponent } from './../../upload-excel/upload-excel.component';
import { SendMessageComponent } from './../../send-message/send-message.component';
import { Routes } from '@angular/router';
import { PortalUsersComponent } from 'app/portal-users/portal-users.component';
import { ResetPasswordComponent } from 'app/reset-password/reset-password.component';
import { StateComponent } from 'app/state/state.component';
import { CityComponent } from 'app/city/city.component';
// import { AdminLayoutComponent } from './admin-layout.component';



export const AdminLayoutRoutes: Routes = [
    { path: 'portal-users', component: PortalUsersComponent, canActivate: [AdminAuthGuardService] },
    { path: 'organization', component: StateComponent, canActivate: [AdminAuthGuardService]},
    { path: 'state', component: CityComponent, canActivate: [AdminAuthGuardService] },
    {path: 'send-message', component: SendMessageComponent},
    {path: 'upload-excel', component: UploadExcelComponent},
    {path: 'forward-message', component: ForwardMessageComponent},
    {path: 'sent-report', component: SentReportComponent},
    {path: 'forwarded-report', component: ForwardedReportComponent},
    {path: 'excel-report', component: ExcelReportComponent}
];
