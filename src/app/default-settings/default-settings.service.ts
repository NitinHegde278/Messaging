import { Injectable } from '@angular/core';
import { UrlConstants } from 'app/helpers/urlconstant';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DefaultSettingsService {

  constructor(private httpClient:HttpClient){}
  defaultsettingStatus(payload):Observable<[]>{
    const url =UrlConstants.MAINURL + UrlConstants.defaultsetting;
    return this.httpClient.post<any>(url,payload);
  }

  defaultsettings(payload):Observable<[]>{
    const url =UrlConstants.MAINURL + UrlConstants.defaultsettings;
    return this.httpClient.post<any>(url,payload);
  }
  defaultPassword(subdata):Observable<any[]> {
    const url = UrlConstants.MAINURL + UrlConstants.defaultpasswordUrl;
    return this.httpClient.post<any[]>(url,subdata);
} 
}