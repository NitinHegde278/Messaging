import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConstants } from '../../helpers/urlconstant';
// import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })

  
export class setService {

    constructor(private httpClient:HttpClient) { }

    // checkresetUrl = environment.backendUrl + 'portal/users/verifyreset';
    // updatepasswordUrl = environment.backendUrl + 'portal/users/updatepassword';

    checkReset(subdata):Observable<any[]> {
        const url = environment.backendUrl + UrlConstants.checkresetUrl;
        return this.httpClient.post<any>(url, subdata);
    } 

    updatePassword(subdata):Observable<any[]> {
        const url = environment.backendUrl + UrlConstants.updatepasswordUrl;
        return this.httpClient.post<any[]>(url,subdata);
    } 

}