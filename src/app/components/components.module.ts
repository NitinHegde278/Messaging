import { UserDetailsComponent } from './user-details/user-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LogoutComponent } from './navbar/logout/logout.component';
import {MatDialogModule } from '@angular/material/dialog';
// import {MatButtonModule,MatSidenavModule,MatListModule,MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
 import {MatSidenavModule} from '@angular/material/sidenav';
 import {MatListModule} from '@angular/material/list';
 import {MatCheckboxModule} from '@angular/material/checkbox';
 import {MatToolbarModule} from '@angular/material/toolbar';
 import {MatInputModule} from '@angular/material/input';
 import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
 import {MatCardModule} from '@angular/material/card';
 import {MatMenuModule} from '@angular/material/menu';
 import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    LogoutComponent,
    UserDetailsComponent
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    UserDetailsComponent
  ],
  entryComponents:[
    LogoutComponent
  ]
})
export class ComponentsModule { }
