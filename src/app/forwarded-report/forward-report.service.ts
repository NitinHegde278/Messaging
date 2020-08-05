import { UrlConstants } from 'app/helpers/urlconstant';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/environment';

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
         const url = environment.backendUrl + UrlConstants.forwardUserAtAdmin;
         return this.httpClient.post<any>(url,payload,this.options);
     }

     forwardUserSuccess(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.forwardUserSuccess;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    forwardUserDetail(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.forwardUserDetail;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    forwardAdmin(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.forwardAdmin;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    forwardAdminDetail(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.forwardAdminDetails;
        return this.httpClient.post<any>(url,payload,this.options);
    }
}
