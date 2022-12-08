import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ActivepromotionComponent } from './core/activepromotion/activepromotion.component';
import { BranchregisterComponent } from './core/branchregister/branchregister.component';

import { DashboardComponent } from './core/dashboard/dashboard.component';
import { ExistingpromotionsComponent } from './core/existingpromotions/existingpromotions.component';
import { FirstpagepromotionComponent } from './core/firstpagepromotion/firstpagepromotion.component';
import { ListofoutletsComponent } from './core/listofoutlets/listofoutlets.component';
import { ListoftransactionsComponent } from './core/listoftransactions/listoftransactions.component';
import { OutlettransactionComponent } from './core/outlettransaction/outlettransaction.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { ProfileComponent } from './core/profile/profile.component';
import { PromotionsComponent } from './core/promotions/promotions.component';
import { RecentpromotionComponent } from './core/recentpromotion/recentpromotion.component';
import { ViewpromotionsComponent } from './core/viewpromotions/viewpromotions.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './service/side-nav/side-nav.component';
import { AuthGuard } from './_services/auth.guard';

const routes: Routes = [
  {path: 'auth' , 
  component:LoginComponent },
  {path:'' , redirectTo:'/auth' , pathMatch:'full'},
  
  {
    path:'merchant',
    component: LayoutComponent , canActivate:[AuthGuard],
    children:[
      {
        path:'dashboard',
        component:DashboardComponent , 
        
        },
        
      
    
      {
        path:'',
        
        component:DashboardComponent , 
      },
      {
        path:'listoftransactions',
        
        component:ListoftransactionsComponent
      },
      // {
      //   path:'settings',
        
      //   component:SettingsComponent
      // },
      {
        path:'profile',
        
        component:ProfileComponent
      },
      {
        path:'prmos',
        
        component:FirstpagepromotionComponent
      },
      {
        path:'promotions',
        
        component:PromotionsComponent
      },
      {
        path:'all-promotions/:id',
        
        component:ExistingpromotionsComponent
      },
      {
        path:'active-promotions',
        
        component:ActivepromotionComponent
      },
      {
        path:'recent-promotions',
        
        component:RecentpromotionComponent
      },
      {
        path:'branch-register',
        
        component:BranchregisterComponent
      },
      {
        path:'list-of-outlets',
        
        component:ListofoutletsComponent
      },
      {
        path:'outlet-transaction/:id',
        
        component:OutlettransactionComponent
      },
      {
        path:'viewpromotions',
        
        component:ViewpromotionsComponent
      },
      {
        path:'**',
        
        component:PagenotfoundComponent
      },
    ]
  }
  // {path: ' ' , component: DashboardComponent , canActivate: [AuthGuard]},
  // {path: 'dashboard' , component: DashboardComponent , canActivate: [AuthGuard]},
  // {path: 'login' , component: LoginComponent },
  // {path: '', redirectTo: '/dashboard' , pathMatch: 'full'},
  // {path: 'listoftransactions', component: ListoftransactionsComponent},
  // {path: 'profile', component: ProfileComponent},
  // {path: '**' , component: PagenotfoundComponent}

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
