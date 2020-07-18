import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  observableIsLoggedin = new BehaviorSubject<boolean>(false)
  isLoggedIn = false;
  
  setIsLoggedIn(isLoggedIn:boolean){
    this.observableIsLoggedin.next(isLoggedIn);
    this.isLoggedIn = isLoggedIn;
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }
  constructor(
    private http: HttpClient
  ) {
    this.checkIsLoggedIn().subscribe(res=>{
      this.setIsLoggedIn(res.body['isloggedin']);
    })
  }

  checkIsLoggedIn(){
    console.log(this.isLoggedIn);
    return this.http.get(environment.isloggedin_api, {observe: 'response', withCredentials:true})
    // .pipe(
    //   map(res=>{
    //     if(res.body['isloggedin']){
    //       this.isLoggedIn = true;
    //     } else {
    //       this.isLoggedIn = false;
    //     }
    //     return res;
    //   }),
    //   error =>{
    //     this.isLoggedIn = false;
    //     return error;
    //   }
    // );
  }
  login(email:string, password:string, remember?:string){
      const formData = new FormData()
      formData.append('email', email);
      formData.append('password', password);
      if (remember){
        formData.append('remember', remember);
      }
      
      return this.http.post(environment.login_api, formData,{observe: 'response', withCredentials:true});
  }

  logout(){
    return this.http.get(environment.logout_api, {observe: 'response', withCredentials:true});
    
  }
}
