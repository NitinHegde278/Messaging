import { UrlConstants } from 'app/helpers/urlconstant';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


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
        const url = UrlConstants.MAINURL + UrlConstants.getUserForwardRequest;
        return this.httpClient.post<any>(url,payload,this.options);
     }

     userForwardDetails(payload): Observable<any>{
       const url = UrlConstants.MAINURL + UrlConstants.userForwardDetails;
       return this.httpClient.post<any>(url,payload,this.options);
     }

     userForwardButton(payload): Observable<any>{
       const url = UrlConstants.MAINURL + UrlConstants.userForwardButton;
       return this.httpClient.post<any>(url,payload,this.options);
     }

     userDeleteButton(payload): Observable<any>{
       const url = UrlConstants.MAINURL + UrlConstants.userDeleteButton;
       return this.httpClient.post<any>(url,payload,this.options);
     }
  }