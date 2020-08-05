import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UrlConstants } from "app/helpers/urlconstant";
import { HttpParams, HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class UserDetailsService {
    constructor(private httpClient: HttpClient){ }

    messageCredits(): Observable<any>{
        const url = UrlConstants.messageCredits;
        let httpParams = new HttpParams();
        httpParams = httpParams.append('authkey',environment.messageCreditAuth);
        httpParams = httpParams.append('type','4');
        return this.httpClient.get(url,{params: httpParams});
      }
  }