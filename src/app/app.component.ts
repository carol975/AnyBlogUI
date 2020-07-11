import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'anyblog-ui';
  currentRoute = ''
  constructor(private router: Router){
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        this.currentRoute = e.url;
        console.log(this.currentRoute)
      }
    });
    }
  
  getCurrentRoute(){
    console.log(this.router.url);
    return this.router.url;
  }
}
