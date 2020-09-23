import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface SignUpForm {
  username:string,
  email:string,
  password:string,
  confirm_password:string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  signup(signupForm: SignUpForm){
    const formData = new FormData();
    formData.append('username', signupForm.username);
    formData.append('email', signupForm.email);
    formData.append('password', signupForm.password);
    formData.append('confirmpassword', signupForm.confirm_password);
    return this.http.post(environment.signup_api, formData,{observe: 'response', withCredentials:true});
  }
}
