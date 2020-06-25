import {Injectable,Component} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {ProjectCustomUtils} from '../helpers/ProjectCustomUtils';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private dialog:MatDialog) {
    }
    // openPopUp() {
    //     let dialogRef: MatDialogRef<any> = this.dialog.open(TokenExpiredDialog, {
    //     width: '300px',
    //     });
    //     dialogRef.afterClosed()
    //     .subscribe(res => {
    //      this.router.navigateByUrl('/')
    //         return false;
    //     });
    // }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const expired = ProjectCustomUtils.isTokenExpired();
        // console.log('auth.guard:canActivate: checking auth guard token expired ? ', expired);
        // console.log('auth.guard:canActivate: Token expired redirecting to login ', expired);
        if(!expired){
            return true;
        }else{
            // this.openPopUp();
            this.dialog.open(TokenExpiredDialog,{

            });
            this.router.navigateByUrl('/');
                    // return true;
        }
    
    }
}
@Component({
    selector: 'token-expired-dialog',
    templateUrl: 'token-expired-dialog.html',
  })
export class TokenExpiredDialog{

}