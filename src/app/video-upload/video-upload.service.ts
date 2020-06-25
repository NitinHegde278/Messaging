import { Injectable } from '@angular/core';
import { UrlConstants } from 'app/helpers/urlconstant';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from './model/video' 
@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  constructor(private httpClient:HttpClient){}

    getsub_name(payload):Observable<Video[]> {
      const url = UrlConstants.MAINURL + UrlConstants.getsub;
      // console.log(url,"outgoing url");
      return this.httpClient.post<any>(url,payload);
   }

    getvideos(payload):Observable<Video[]> {
      const url = UrlConstants.MAINURL + UrlConstants.getvideos;
      // console.log(url,"incoming data")
      return this.httpClient.post<any>(url,payload);
   }

   delete_video(payload):Observable<Video[]> {
    const url = UrlConstants.MAINURL + UrlConstants.deletevideo;
    return this.httpClient.post<any>(url,payload);
 }
   
}
