import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200)),
    ])
  ]
})
export class SideNavComponent implements OnInit {

menus:any;

roleId: number=0;
orgMenus = [];
// orgType: number;
remove: boolean = true;
  merchantAddress: any;
  merchantImage: any;
  merchantBusinessName: any;
  merchant_resp: any;
  merchant_resp_add: any;
  merchant_resp_img: any;
 
  merchant_Bname: any;
  merchant_image: any;
  img: any;
 
  response: any;
  lengthResponse: any;
  sidemenuBlock:boolean =false

  constructor(private sideNavService:SideNavService , private authservice: AuthService , public api: ApiService) { 
    this.menus = this.sideNavService.getMenus();
    this.api.merchantName$.subscribe((res:any)=>{
      this.merchant_resp_add =res
      
      console.log("subjectwishheader" , this.merchant_Bname);
      
   })
   this.api.merchantBname$.subscribe((respo:any)=>{
    this.merchant_Bname =respo
    
    console.log("subjectwishheader" , this.merchant_Bname);
    
 })
 this.api.merchantImage$.subscribe((response:any)=>{
  this.merchant_image =response.name
  
  console.log("subjectwishheader image" , this.merchant_image);
  
})

  }
  // toggle nav
 

  togglea() {
    if (this.remove == false) {
      this.remove = true;
    } else {
      this.remove = false;
    }
  }

// end
  getSideBarState() {
    return this.sideNavService.getSidebarState();
  }

  ngOnInit(): void {
  this.getMerchantProfile();
 
  }
  toggle(currentMenu:any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element: { active: boolean; }) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }
  getState(currentMenu:any) {
    if(currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }  
  getMerchantProfile(){
    const currentUser = this.authservice.getUser();
  
    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`profile`,{headers}).subscribe((r: any) => {
      
      this.merchantAddress=r.address
      
        this.img=r.merchantimage;
      this.merchant_Bname=r.businessname;
      this.merchant_resp_add=r.address;
      this.merchant_image=r.merchantimage;
     
      
      
      
     
      
    });
  }
 
 

}

