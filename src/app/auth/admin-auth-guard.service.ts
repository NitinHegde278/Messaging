import { AuthService } from 'app/auth/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private dialog:MatDialog, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if(this.authService.role && this.authService.role == 'A'){
      return true;
    }else{
      const dialogRef = this.dialog.open(DeniedAccess,{

      });
      dialogRef.afterClosed().subscribe(data =>{
        return false;
      });
    }
  }
}

@Component({
  selector: 'denied-access',
  templateUrl: 'denied-access.html',
})
export class DeniedAccess{

}
