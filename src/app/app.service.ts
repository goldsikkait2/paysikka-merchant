import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  showNavigation$: BehaviorSubject<boolean>;
  showHeader$: BehaviorSubject<boolean>;
  showFooter$: BehaviorSubject<boolean>;
 

  constructor() { 
    this.showNavigation$ = new BehaviorSubject<boolean>(true);
    this.showHeader$ = new BehaviorSubject<boolean>(true);
    this.showFooter$ = new BehaviorSubject<boolean>(true);
  }
}
