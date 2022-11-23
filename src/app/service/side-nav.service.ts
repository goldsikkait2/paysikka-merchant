import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  toggled: any;
  public toggle$: Subject<any> = new Subject;
  constructor() { }

  isToggle(data: any) {
    this.toggle$.next(data);
  }

  menus = [
    {
      title: 'Dashboard',
      icon: 'fa-solid fa-gauge',
      active: false,
      type: 'simple',
      routerLink: 'dashboard',
      routerOptions: {},
      // role: 0,
    },
    {
      title: 'List of Transaction',
      icon: 'fa fa-id-card',
      active: false,
      type: 'simple',
      routerLink: 'listoftransactions',
      routerOptions: {},
      // role: 0,
    },
    {
      
      title: 'Promotions',
      icon: 'fa-solid fa-rectangle-ad',
      active: false,
      type: 'simple',
      routerLink: 'promotions',
      routerOptions: {},
      // role: 0,

    },
    {
      
      title: 'Outlet Details',
      icon: 'fa-regular fa-building',
      active: false,
      type: 'simple',
      routerLink: 'list-of-outlets',
      routerOptions: {},
      role: 0,
      

    },
    {
      
      title: 'Outlet Registration',
      icon: 'fa-solid fa-users',
      active: false,
      type: 'simple',
      routerLink: 'branch-register',
      routerOptions: {},
      role: 0,
      

    },
    
   
    
    
 
  ]

  getMenus() {
    return this.menus;
  }
  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

}
