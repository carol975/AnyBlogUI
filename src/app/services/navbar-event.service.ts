import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export interface NavBarSetting {
  showNavBar: boolean,
  showPostButton: boolean,
  showLogoutButton: boolean,
  showLoginButton: boolean,
  showPublishButton: boolean
}

@Injectable({
  providedIn: 'root'
})
export class NavbarEventService {
  navBarSetting:NavBarSetting;
  navBarSettingObservable: BehaviorSubject<NavBarSetting>;
  showNavBarObservable = new BehaviorSubject<boolean>(false);
  publish_evt: Subject<any>;
  constructor() {
    this.publish_evt = new Subject();
    this.navBarSetting = {
      showNavBar: true,
      showPostButton: false,
      showLogoutButton: false,
      showLoginButton: true,
      showPublishButton: false
    }
    this.navBarSettingObservable = new BehaviorSubject<NavBarSetting>(this.navBarSetting);
   }
}
