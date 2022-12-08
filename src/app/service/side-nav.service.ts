import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from '../api.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  toggled: any;
  public toggle$: Subject<any> = new Subject;
 
  constructor( private authservice: AuthService, private api: ApiService) { }

  isToggle(data: any) {
    this.toggle$.next(data);
  }
  ngOnInit(){

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
      routerLink: 'prmos',
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
