import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NavbarEventService } from 'src/app/services/navbar-event.service';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anyblog-ui';
  currentRoute = ''
  isLoggedin=false;
  constructor(private router: Router,
    private navbarEventService: NavbarEventService,
    private authService: AuthenticationService){
    this.subscribeRouteChange();
    this.subscribeToLoginStatusChange();
    }
  subscribeRouteChange(){
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        this.currentRoute = e.url;
      }
    });
  }

  subscribeToLoginStatusChange(){
    this.authService.observableIsLoggedin.subscribe((loginStatus: boolean) => {
      this.isLoggedin = loginStatus;
    })
  }
  publish(){
    this.navbarEventService.publish_evt.next();
  }
  logout(){
    this.authService.logout().subscribe(_=>{
      console.log(_);
      this.authService.setIsLoggedIn(false);
      this.router.navigate(['logout']);
    },
    error=>{
      console.log(error)
    })
  }
}
