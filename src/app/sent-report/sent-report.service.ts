import { UrlConstants } from 'app/helpers/urlconstant';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class SentReportService {
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

     sentUserAtOrg(payload): Observable<any>{
         const url = environment.backendUrl + UrlConstants.sentUserAtOrg;
         return this.httpClient.post<any>(url,payload,this.options);
     }

     sentUserAtAdmin(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.sentUserAtAdmin;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    sentUserSuccess(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.sentUserSuccess;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    sentUserDetail(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.sentUserdetail;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    sentAdminSuccess(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.sentAdmin;
        return this.httpClient.post<any>(url,payload,this.options);
    }

    sentAdminDetail(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.sentAdminDetails;
        return this.httpClient.post<any>(url,payload,this.options);
    }
  }