import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'app/helpers/urlconstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StateUser } from './model/state';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  options;
  token = localStorage.getItem('token');
  constructor(private httpClient:HttpClient) { 
    let httpHeaders = new HttpHeaders({
      'authorization': this.token,
    });
    this.options = {
      headers: httpHeaders
    };
  }

  
  saveState(payload): Observable<any> {
    const url = environment.backendUrl + UrlConstants.saveState;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
    }

    getState(payload):Observable<any> {
    const url = environment.backendUrl + UrlConstants.getstatelist;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url,payload,this.options);

  }

updateState(payload):Observable<StateUser[]> {
  const url = environment.backendUrl + UrlConstants.updateState;
  // console.log(url,"outgoing url");
  return this.httpClient.post<StateUser[]>(url,payload);
}


  deleteState(data1):Observable<StateUser[]> {
    const url = environment.backendUrl + UrlConstants.deleteState;
    // console.log(url,"outgoing url");
    return this.httpClient.post<StateUser[]>(url,data1);
 }
 

  
}