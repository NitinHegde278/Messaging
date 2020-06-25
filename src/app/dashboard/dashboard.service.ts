import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Observable } from 'rxjs';
import { UrlConstants } from 'app/helpers/urlconstant';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private httpClient:HttpClient){}
  getlikes(payload):Observable<any> {
    const url = UrlConstants.MAINURL + UrlConstants.getlikes;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url,payload);

  }
}