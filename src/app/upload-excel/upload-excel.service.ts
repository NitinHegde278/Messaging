import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UrlConstants } from '../helpers/urlconstant';

@Injectable({
    providedIn: 'root'
  })
  export class UploadExcelService {
    constructor(private httpClient: HttpClient){ }

    excelData(payload): Observable<any>{
        const url =UrlConstants.MAINURL + UrlConstants.excelData;
        return this.httpClient.post<any>(url,payload);
    }
  }