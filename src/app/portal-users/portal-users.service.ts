import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';

import { PortalUser } from 'app/portal-users/model/portal';
// import { PortalUserColumns } from '../mock/mock-portaluser'
// import { environment } from 'app/environments/environment';
import { UrlConstants } from '../helpers/urlconstant';

@Injectable({
  providedIn: 'root'
})
export class PortalUserService {
  getPortalColumns() {
    throw new Error("Method not implemented.");
  }

  

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

  saveuser(payload): Observable<any> {
    const url = UrlConstants.MAINURL + UrlConstants.saveUser;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload,this.options);
    }

  getPortalUsers(payload):Observable<any> {
    const url = UrlConstants.MAINURL + UrlConstants.getuserlist;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url,payload,this.options);

  }

  // statuscheck(payload):Observable<[]>{
  //   const url =UrlConstants.MAINURL + UrlConstants.statuscheck;
  //   return this.httpClient.post<any>(url,payload);
  // }

  getRolesData(payload):Observable<PortalUser[]> {
    const url = UrlConstants.MAINURL + UrlConstants.getroles;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
 }

  deleteUser(data1):Observable<any> {
    const url = UrlConstants.MAINURL + UrlConstants.deleteportalUrl;
    // console.log(url,"outgoing url");
    return this.httpClient.post<PortalUser[]>(url,data1,this.options);
 }
 

 getUpdateUsers(payload):Observable<any> {
  const url = UrlConstants.MAINURL + UrlConstants.updateUser;
  // console.log(url,"outgoing url");
  return this.httpClient.post<PortalUser[]>(url,payload,this.options);
}

  
}
