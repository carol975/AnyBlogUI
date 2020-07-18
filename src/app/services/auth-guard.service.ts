import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{
    if(!this.auth.getIsLoggedIn()){
      const isloggedin = new Observable<boolean>((observer)=>{
        this.auth.checkIsLoggedIn().subscribe(res=>{
          if(res.body['isloggedin']){
            this.auth.setIsLoggedIn(true);
            observer.next(true);
          }
          else{
            observer.next(false);
          }
        })
      })
      return isloggedin;  
    }
    else{
      return true;
    }

    
  
    
    }


    // if(this.auth.getIsLoggedIn() == true) {
    //   console.log("im true")
    //   return true;
    // }
    // return this.auth.checkIsLoggedIn().pipe(
    //   map(res=>{
    //     if(res.body['isloggedin']){
    //       this.auth.setIsLoggedIn(true);
    //       console.log("after",this.auth.getIsLoggedIn());

    //       return true;
    //     } else {
    //       this.auth.setIsLoggedIn(false);
    //       console.log("after",this.auth.getIsLoggedIn());
    //       this.router.navigate(['login'])
    //       return false;
    //     }
    //   }),
    //   catchError((err) => {
    //     this.auth.setIsLoggedIn(false);
    //     return of(false);
    //   })
    // )
    
  
}
