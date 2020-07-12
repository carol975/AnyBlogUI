import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarEventService {
  publish_evt: Subject<any>;
  constructor() {
    this.publish_evt = new Subject();
   }
}
