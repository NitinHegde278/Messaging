import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  

  constructor(private httpClient:HttpClient) { }

  saveuser(payload): Observable<any> {
    const url = UrlConstants.MAINURL + UrlConstants.saveUser;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
    }

  getPortalUsers(payload):Observable<PortalUser[]> {
    const url = UrlConstants.MAINURL + UrlConstants.getuserlist;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url,payload);

  }

  statuscheck(payload):Observable<[]>{
    const url =UrlConstants.MAINURL + UrlConstants.statuscheck;
    return this.httpClient.post<any>(url,payload);
  }

  getRolesData(payload):Observable<PortalUser[]> {
    const url = UrlConstants.MAINURL + UrlConstants.getroles;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
 }

  deleteUser(data1):Observable<PortalUser[]> {
    const url = UrlConstants.MAINURL + UrlConstants.deleteportalUrl;
    // console.log(url,"outgoing url");
    return this.httpClient.post<PortalUser[]>(url,data1);
 }
 

 getUpdateUsers(payload):Observable<PortalUser[]> {
  const url = UrlConstants.MAINURL + UrlConstants.updateUser;
  // console.log(url,"outgoing url");
  return this.httpClient.post<PortalUser[]>(url,payload);
}

  
}
