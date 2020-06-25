import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable,Component } from '@angular/core';
import { ProjectCustomUtils } from '../helpers/ProjectCustomUtils';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
// import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/typings/overlay-directives';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
 
    constructor(private router: Router,private dialog : MatDialog) {

    }
    openPopUp() {
        let dialogRef: MatDialogRef<any> = this.dialog.open(tokenDialog, {
            width : '300px'
        });
        dialogRef.afterClosed()
        .subscribe(res => {
         this.router.navigateByUrl('/');
         localStorage.clear();
            return false;
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('RequestInterceptor : intercept : Interceptred request : ', req);
        const authToken = 'Bearer ' + localStorage.getItem(ProjectCustomUtils.projectJWTToken);
        const copiedRequest = req.clone({ headers: req.headers.set('Authorization', authToken) });
        return next.handle(copiedRequest).pipe(tap(event => {
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    this.openPopUp();
                    // console.log(err.status,"frgugd")
                    // this.router.navigate(['/']);
                }
                // else if(err.status === 404) {
                // this.openPopUp();
                // }
            }
        }
        ));
    }

}
@Component({
    selector: 'token-expired-dialog',
    templateUrl: 'token-expired-dialog.html',
  })
export class tokenDialog{

}


