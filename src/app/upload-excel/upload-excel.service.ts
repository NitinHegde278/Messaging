import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UrlConstants } from '../helpers/urlconstant';

@Injectable({
    providedIn: 'root'
  })
  export class UploadExcelService {
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

    excelData(payload): Observable<any>{
        const url =UrlConstants.MAINURL + UrlConstants.excelData;
        return this.httpClient.post<any>(url,payload,this.options);
    }
    excelCorrection(payload): Observable<any>{
      const url = UrlConstants.MAINURL + UrlConstants.excelCorrection;
      return this.httpClient.post<any>(url,payload,this.options);
    }
  }