import { UrlConstants } from 'app/helpers/urlconstant';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })

  export class ExcelReportService{
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

     getExcelReport(payload): Observable<any>{
         const url = environment.backendUrl + UrlConstants.excelreport;
         return this.httpClient.post<any>(url,payload,this.options);
     }

  }