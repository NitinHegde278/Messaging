import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog'
import { from } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  header = "Logout";
  constructor(
    private router: Router,
    public service: AuthService,
    public dialogRef: MatDialogRef<LogoutComponent>
  ) { }

  ngOnInit() {
  }

  dashboard() {
        this.dialogRef.close();
        localStorage.clear();
        this.router.navigate(['../']);
  }

}
