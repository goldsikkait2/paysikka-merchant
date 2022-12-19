import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './top/top-nav/top-nav.component';
import { LayoutComponent } from './layout/layout.component';
import { SideNavComponent } from './service/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmBoxConfigModule,DialogConfigModule, NgxAwesomePopupModule,ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';


import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { ListoftransactionsComponent } from './core/listoftransactions/listoftransactions.component';
import { ProfileComponent } from './core/profile/profile.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { CountdownModule } from 'ngx-countdown';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgxConfirmBoxModule,NgxConfirmBoxService } from 'ngx-confirm-box';
import { PromotionsComponent } from './core/promotions/promotions.component';
import { ExistingpromotionsComponent } from './core/existingpromotions/existingpromotions.component';
import { ActivepromotionComponent } from './core/activepromotion/activepromotion.component';
import { RecentpromotionComponent } from './core/recentpromotion/recentpromotion.component';
import { BranchregisterComponent } from './core/branchregister/branchregister.component';
import { ListofoutletsComponent } from './core/listofoutlets/listofoutlets.component';
import { OutlettransactionComponent } from './core/outlettransaction/outlettransaction.component';
import { ViewpromotionsComponent } from './core/viewpromotions/viewpromotions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FirstpagepromotionComponent } from './core/firstpagepromotion/firstpagepromotion.component';







@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    LayoutComponent,
    SideNavComponent,
    DashboardComponent,
    LoginComponent,
    ListoftransactionsComponent,
    ProfileComponent,
    PagenotfoundComponent,
    PromotionsComponent,
    ExistingpromotionsComponent,
    ActivepromotionComponent,
    RecentpromotionComponent,
    BranchregisterComponent,
    ListofoutletsComponent,
    OutlettransactionComponent,
    ViewpromotionsComponent,
    FirstpagepromotionComponent,
   
  ],
  imports: [
   
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule,
    DialogConfigModule,
    MatListModule,
    BrowserAnimationsModule,
   
    HttpClientModule,
    CommonModule,
    ConfirmBoxConfigModule,
    ToastNotificationConfigModule,
    FormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgOtpInputModule,
    CountdownModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxAwesomePopupModule.forRoot({
      colorList: {
        success: '#4152a5', // optional
        info: '#2f8ee5', // optional
        warning: '#ffc107', // optional
        danger: '#e46464', // optional
        customOne: '#3ebb1a', // optional
        customTwo: '#bd47fa', // optional (up to custom five)
      },
    }),
  
    DialogConfigModule, 

    ConfirmBoxConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot(),
    Ng2SearchPipeModule,


   
  ],
  providers: [ NgxConfirmBoxService,
   
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
