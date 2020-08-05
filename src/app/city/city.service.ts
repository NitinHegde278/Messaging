import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'app/helpers/urlconstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CityUser } from './model/city';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  // getPortalColumns() {
  //   throw new Error("Method not implemented.");
  // }

  // portalUserUrl = environment.backendUrl + 'portal/users/getuserlist';
  // portaladdteamUrl = environment.backendUrl + 'portal/users/addupdateuser';
  // portalroleUrl = environment.backendUrl + 'portal/users/getroles';
  // deleteportalUrl = environment.backendUrl + 'portal/users/removeuser';
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

  
  saveCity(payload): Observable<any> {
    const url = environment.backendUrl + UrlConstants.saveCity;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
    }

    getCity(payload):Observable<any> {
    const url = environment.backendUrl + UrlConstants.getcitylist;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url,payload,this.options);

  }
  getRolesData(payload):Observable<CityUser[]> {
    const url = environment.backendUrl + UrlConstants.getcats;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
 }

 getcat_name(payload):Observable<CityUser[]>{
   const url = environment.backendUrl + UrlConstants.getcat;
  //  console.log(url,"ghftyfhgh")
   return this.httpClient.post<any>(url,payload);
 }

updateCity(payload):Observable<CityUser[]> {
  const url = environment.backendUrl + UrlConstants.updateCity;
  // console.log(url,"outgoing url");
  return this.httpClient.post<CityUser[]>(url,payload);
}


  deleteCity(data1):Observable<CityUser[]> {
    const url = environment.backendUrl + UrlConstants.deleteCity;
    // console.log(url,"outgoing url");
    return this.httpClient.post<CityUser[]>(url,data1);
 }
 

  
}