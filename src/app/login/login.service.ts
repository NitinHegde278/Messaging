import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlConstants } from '../helpers/urlconstant';
import { Observable, from } from 'rxjs/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { url } from 'inspector';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/Subject'


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  // signinUrl: string;
  errorMessage: string;
  private subject = new Subject<any>();
  checkemailUrl = environment.backendUrl + 'portal/users/forgotpassword';
  signinUrl = environment.backendUrl + 'portal/users/login';
  // loginuserUrl = environment.backendUrl + 'portal/users/loginuserdata';
  constructor(private http: HttpClient,
    private httpClient: HttpClient) {

  }
  // addCC(model): Observable<any> {
  //     const url = environment.backendUrl + UrlConstants.usersGetTableItems;
  //     return this.http.post<any>(url, model);
  //     }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    email: new FormControl('', Validators.email),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      email: '',
      password: '',
    });
  }
  clearMessage() {
    this.subject.next();
  }


  signin(email, password): Observable<any> {
    let Payload = {
      email: email,
      password: password,
      withCredentials: true
    };
    return this.httpClient.post(this.signinUrl, Payload, { withCredentials: true });
  }

  checkemail(subdata):Observable<any[]>{
    return this.httpClient.post<any[]>(this.checkemailUrl,subdata);
  }

  // loginuser(subdata): Observable<any[]> {
  //   return this.httpClient.post<any[]>(this.loginuserUrl, subdata);
  // }
}