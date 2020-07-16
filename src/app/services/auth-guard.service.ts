import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { map, catchError } from 'rxjs/operators';
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
    console.log(this.auth.isLoggedIn);
    if(this.auth.isLoggedIn) {
      console.log("im true")
      return true;
    }
    return this.auth.checkIsLoggedIn().pipe(
      map(res=>{
        if(res.body['isloggedin']){
          // this.auth.isLoggedIn = true;
          return true;
        } else {
          // this.auth.isLoggedIn = false;
          // console.log(this.auth.isLoggedIn);
          return false;
        }
      }),
      catchError((err) => {
        return of(false);
      })
    )
    
  }
}
