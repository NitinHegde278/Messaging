import { Injectable, EventEmitter } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private subject = new Subject<any>();
  isLoggedIn = true;
  role_id: any;
  userName:string;
  name: string;
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  checkLoginApi = environment.backendUrl + 'portal/users/isAuthenticated';
  logoutApi = environment.backendUrl + 'auth/logout';

  constructor(private httpClient: HttpClient) { 
    
  }
  incidentData = new EventEmitter<any>();
 
  signin(userName, role_id, name): Observable<boolean> {

    let resp = this.httpClient.post(this.checkLoginApi, '', {withCredentials: true});
    //  console.log(resp,"dbhbd");
    //validate jwt tokens here
    this.userName=userName;
    this.name = name;
    this.isLoggedIn=true;
    this.role_id = Number(role_id);
    return of(true);
  }

  logout(): void {
    this.isLoggedIn = false;
    this.role_id=100;
    let resp = this.httpClient.post(this.logoutApi, '', {withCredentials: true});
  
  }

  sendMessage(data: any) {
    this.subject.next(data);
  }
 
  clearMessage() {
    this.subject.next();
  }
    
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
