import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { NavbarEventService } from 'src/app/services/navbar-event.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anyblog-ui';
  currentRoute = ''
  constructor(private router: Router,
    private navbarEventService: NavbarEventService){
    this.subscribeRouteChange();
    }
  subscribeRouteChange(){
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        this.currentRoute = e.url;
      }
    });
  }
  publish(){
    this.navbarEventService.publish_evt.next();
  }
}
