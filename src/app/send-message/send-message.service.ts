import { environment } from 'environments/environment';
import { Injectable } from "@angular/core";
import { SendingTable } from "./model/sendingTable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UrlConstants } from "app/helpers/urlconstant";

// const ELEMENT_DATA: SendingTable[] = [
//     {name: 'Organization A', states:['karnataka','kerala'], sms: 34000, whatsapp: 80000, rowData:''},
//     {name: 'Organization B', states:['karnataka','maharashtra','tamil nadu'], sms: 25000, whatsapp: 68000, rowData:''},
//     {name: 'Organization c', states:['karnataka','kerala'], sms: 34000, whatsapp: 80000, rowData:''},
//     {name: 'Organization D', states:['karnataka','maharashtra','tamil nadu'], sms: 25000, whatsapp: 68000, rowData:''}
//   ];
  
//   const ORG = [
//     {name: 'Organization A'},
//     {name: 'Organization B'},
//     {name: 'Organization C'},
//     {name: 'Organization D'},
//     {name: 'Organization E'},
//   ];
  
@Injectable({
    providedIn: 'root'
  })
  export class SendMessageService {
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
    sendMessage(payload): Observable<any> {
      let httpHeaders = new HttpHeaders({
        'Content-Type' : 'application/json',
        'authkey' : environment.messageCreditAuth
      });
      let options = {
        headers: httpHeaders
      };
      const url = UrlConstants.sendMessage;
      // console.log(url,"outgoing url");
      return this.httpClient.post<any>(url, payload, options);
      }

      createMessage(payload): Observable<any> {
        const url = environment.backendUrl + UrlConstants.createMessage;
        return this.httpClient.post<any>(url,payload,this.options);
      }

      // getNumbers(payload): Observable<any> {
      //   const url = environment.backendUrl + UrlConstants.getNumbers;
      //   return this.httpClient.post<any>(url,payload);
      // }

      admincreateMessage(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.adminCreateMessage;
        return this.httpClient.post<any>(url,payload,this.options);
      }

      getStates(payload): Observable<any> {
        const url = environment.backendUrl + UrlConstants.getStateCount;
        return this.httpClient.post<any>(url,payload,this.options);
      }

      getMsgCount(payload): Observable<any>{
        const url = environment.backendUrl + UrlConstants.getmsgCount;
        return this.httpClient.post<any>(url,payload,this.options);
      }
  }