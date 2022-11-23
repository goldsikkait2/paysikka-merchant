import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { User } from '../_models/User';
import { UserRole } from '../_models/UserRole';
import { Router } from '@angular/router';
import { ConfirmBoxEvokeService, ConfirmBoxInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import {
  
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAdmin!: boolean;
  isStandardUser!: boolean;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  this: any;
  constructor(
      private api: ApiService,
private route:Router,private confirmBoxEvokeService: ConfirmBoxEvokeService

      
  ) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') ||'{}'));
      this.currentUser = this.currentUserSubject.asObservable();

      this.setUser();
  }

  login(mobile: any) {
    console.log(mobile)
      return this.api.post('login', {
          mobile: mobile,
          
      }).pipe(map((user:any) => {

          if (user && user.token) {
            //  this.updateAuthUser(user);
            console.log("user",user)
          }
          return user;
      }));
  }

  /**
   *
   */
   logout() {
    localStorage.removeItem('user');
    this.route.navigate(['/auth']);

   }
  //  isLoggedIn() {
  //   if(localStorage.getItem('auth') == null){
  //     return false
  //   }else{
  //     return true
  //   }
  // }


  /**
   *
   */
  getUser(): User {
      return JSON.parse(localStorage.getItem('user') ||'{}');
  }

  updateAuthUser(user: User): void {
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
  }

  setUser(): void {
      const user = this.getUser();
      if (user && user.role === UserRole.Admin) {
          this.isAdmin = true;
      } else {
          this.isStandardUser = true;
      }
  }

  getAuthToken() {
    return localStorage.getItem('token')
    }

}
