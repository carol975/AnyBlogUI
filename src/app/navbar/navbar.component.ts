import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarEventService, NavBarSetting } from '../services/navbar-event.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'anyblog-ui';
  currentRoute = ''
  showNavBar=false;

  navBarSetting:NavBarSetting;

 constructor(private router: Router,
    private navbarEventService: NavbarEventService,
    private authService: AuthenticationService){
    
    }

  ngOnInit(): void {
    this.navBarSetting = this.navbarEventService.navBarSetting;
    // this.navbarEventService.showNavBarObservable.subscribe(showNavBar=> {
    //   this.showNavBar = showNavBar;
    // })
  }

  publish(){
    this.navbarEventService.publish_evt.next();
  }
  logout(){
    this.authService.logout().subscribe(_=>{
      this.authService.setIsLoggedIn(false);
      this.navbarEventService.showNavBarObservable.next(false);
      this.router.navigate(['logout']);
    },
    error=>{
      console.log(error)
    })
  }

}
