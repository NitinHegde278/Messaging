import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'app/helpers/urlconstant';
import { HttpClient } from '@angular/common/http';
import { CityUser } from './model/city';

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

  constructor(private httpClient:HttpClient) { }

  
  saveCity(payload): Observable<any> {
    const url = UrlConstants.MAINURL + UrlConstants.saveCity;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
    }

    getCity(payload):Observable<CityUser[]> {
    const url = UrlConstants.MAINURL + UrlConstants.getcitylist;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url,payload);

  }
  getRolesData(payload):Observable<CityUser[]> {
    const url = UrlConstants.MAINURL + UrlConstants.getcats;
    // console.log(url,"outgoing url");
    return this.httpClient.post<any>(url, payload);
 }

 getcat_name(payload):Observable<CityUser[]>{
   const url = UrlConstants.MAINURL + UrlConstants.getcat;
  //  console.log(url,"ghftyfhgh")
   return this.httpClient.post<any>(url,payload);
 }

updateCity(payload):Observable<CityUser[]> {
  const url = UrlConstants.MAINURL + UrlConstants.updateCity;
  // console.log(url,"outgoing url");
  return this.httpClient.post<CityUser[]>(url,payload);
}


  deleteCity(data1):Observable<CityUser[]> {
    const url = UrlConstants.MAINURL + UrlConstants.deleteCity;
    // console.log(url,"outgoing url");
    return this.httpClient.post<CityUser[]>(url,data1);
 }
 

  
}