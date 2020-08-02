import { UrlConstants } from 'app/helpers/urlconstant';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class ForwardReportService {
    options;
    token = localStorage.getItem('token');
    constructor(private httpClient: HttpClient){
      let httpHeaders = new HttpHeaders({
        'authorization': this.token,
      });
      this.options = {
        headers: httpHeaders
      };
     }
     
     forwardUserAtAdmin(payload): Observable<any>{
         const url = UrlConstants.MAINURL + UrlConstants.forwardUserAtAdmin;
         return this.httpClient.post<any>(url,payload,this.options);
     }

     forwardUserSuccess(payload): Observable<any>{
        const url = UrlConstants.MAINURL + UrlConstants.forwardUserSuccess;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    forwardUserDetail(payload): Observable<any>{
        const url = UrlConstants.MAINURL + UrlConstants.forwardUserDetail;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    forwardAdmin(payload): Observable<any>{
        const url = UrlConstants.MAINURL + UrlConstants.forwardAdmin;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    forwardAdminDetail(payload): Observable<any>{
        const url = UrlConstants.MAINURL + UrlConstants.forwardAdminDetails;
        return this.httpClient.post<any>(url,payload,this.options);
    }
}
