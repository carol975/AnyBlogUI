import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  login(email:string, password:string, remember?:string){
      const formData = new FormData()
      formData.append('email', email);
      formData.append('password', password);
      if (remember){
        formData.append('remember', remember);
      }
      
      return this.http.post(environment.login_api, formData,{observe: 'response', withCredentials:true});
  }
}
