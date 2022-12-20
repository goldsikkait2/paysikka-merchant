import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SideNavService } from 'src/app/service/side-nav.service';
import { ConfirmBoxEvokeService, ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from 'src/app/_services/auth.service';
import { ApiService } from 'src/app/api.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200))
    ])
  ],
})
export class TopNavComponent implements OnInit {

  opened!:Boolean;

  title! :any;
  notificationsModal: boolean =false;
  paramGlobal: any;
  ListofPromotionsTopNav: any;
  ListofPromotions: any;

  constructor(private navService:SideNavService,private router:Router,private activeRoute:ActivatedRoute,private confirmBoxEvokeService: ConfirmBoxEvokeService,private authserv:AuthService,private api:ApiService) {
    this.navService.isToggle(this.opened = !this.opened);
    
    
   }
   
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params)=>{
      this.paramGlobal = params['id']
      console.log("dsfgfdgfg2", this.paramGlobal);
   
      
      
    })

  }


  toggle(){
    this.navService.isToggle(this.opened = !this.opened)
 
  }

  ngDoCheck(){
    if(this.router.url === '/merchant/dashboard'  || this.router.url === '/'){
      this.title = 'Dashboard'
    }
    else if(this.router.url === '/merchant/listoftransactions'){
      this.title = 'List of Transactions'
    }
    else if(this.router.url === '/merchant/profile'){
      this.title = 'Edit Personal Information'
    }
    else if(this.router.url === '/merchant/promotions'){
      this.title = 'Promotions category' 
    }
    else if(this.router.url === `/merchant/all-promotions/ + this.paramGlobal` ){
      console.log("satish" , this.router.url);
      
      
      this.title = 'All Promotions'
      
      
    }
    else if(this.router.url === '/merchant/active-promotions'){
      this.title = 'Active Promotions'
    }
    else if(this.router.url === '/merchant/branch-register'){
      this.title = 'Outlet Registration'
    }
    else if(this.router.url === '/merchant/recent-promotions'){
      this.title = 'Recent Purchased Promotions'
    }
    else if(this.router.url === '/merchant/list-of-outlets'){
      this.title = 'List Of Outlets'
    }
    else if(this.router.url === '/merchant/outlet-transaction'){
      this.title = 'Outlet Transaction History'
    }
    else if(this.router.url === '/merchant/viewpromotions:id'){
      this.title = 'View Promotions'
    }
    else if(this.router.url === '/merchant/prmos'){
      this.title = 'Promotions'
    }
   
  }
 
    
 

 

  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
  // confirmationLogOut(){
  //   const confirmBox = new ConfirmBoxInitializer();
  //   confirmBox.setTitle('Confirm to Logout');
  //   confirmBox.setMessage('Are you sure?');
  //   confirmBox.setButtonLabels('YES', 'NO');
  //   confirmBox.setConfig({
  //     layoutType: DialogLayoutDisplay.DANGER // SUCCESS | INFO | NONE | DANGER | WARNING
  // });
  //   const subscription:any = confirmBox.openConfirmBox$().subscribe(res=> {
  //     // IConfirmBoxPublicResponse
  //     if(res.success===true){
  //       localStorage.clear();
  //       this.router.navigate(['/']);
  //     }
  //     console.log('Clicked button response: ', res);
  //     subscription.unsubscribe()
      
  // });
  // }
  showNotificationsModal() {
  
    this.notificationsModal = true;
  }
  hideNotificationsModal() {
    this.notificationsModal = true;
  }

  notificationType(type: string, id: number) {
  
  
}
}
