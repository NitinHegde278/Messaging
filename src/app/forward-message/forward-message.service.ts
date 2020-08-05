import { UrlConstants } from 'app/helpers/urlconstant';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'environments/environment';


@Injectable({
    providedIn: 'root'
  })

  export class ForwardMessageService{
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

     getUserForwardRequest(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.getUserForwardRequest;
        return this.httpClient.post<any>(url,payload,this.options);
     }

     userForwardDetails(payload): Observable<any>{
       const url = environment.backendUrl + UrlConstants.userForwardDetails;
       return this.httpClient.post<any>(url,payload,this.options);
     }

     userForwardButton(payload): Observable<any>{
       const url = environment.backendUrl + UrlConstants.userForwardButton;
       return this.httpClient.post<any>(url,payload,this.options);
     }

     userDeleteButton(payload): Observable<any>{
       const url = environment.backendUrl + UrlConstants.userDeleteButton;
       return this.httpClient.post<any>(url,payload,this.options);
     }

     getAdminForwardRequest(payload): Observable<any>{
       const url = environment.backendUrl + UrlConstants.getAdminForwardRequest;
       return this.httpClient.post<any>(url,payload,this.options);
     }

     adminForwardDetails(payload): Observable<any>{
      const url = environment.backendUrl + UrlConstants.adminForwardDetails;
      return this.httpClient.post<any>(url,payload,this.options);
    }

    adminSent(payload): Observable<any>{
      const url = environment.backendUrl + UrlConstants.adminSent;
      return this.httpClient.post<any>(url,payload,this.options);
    }
    
    adminDelete(payload): Observable<any>{
      const url = environment.backendUrl + UrlConstants.adminDelete;
      return this.httpClient.post<any>(url,payload,this.options);
    }
  }