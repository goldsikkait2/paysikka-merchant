import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-firstpagepromotion',
  templateUrl: './firstpagepromotion.component.html',
  styleUrls: ['./firstpagepromotion.component.scss'],
})
export class FirstpagepromotionComponent implements OnInit {
  lengthofPomotions: any;
  lengthofPomotionslength: any;
  listpromotions: any;
  arryObj: any;

  constructor(private authserv: AuthService, private api: ApiService) {}

  ngOnInit(): void {
    this.getListOfPromotions();
    this.getRecentPurchasedList();
  }
  getListOfPromotions() {
    const currentUser = this.authserv.getUser();

    let headers = new HttpHeaders().set('Authorization', currentUser.token);
    this.api.get(`promotions/list`, { headers }).subscribe((r: any) => {
      this.lengthofPomotions = r;
      this.lengthofPomotionslength = this.lengthofPomotions.length;
      console.log('list of promotions', this.lengthofPomotions);
    });
  }
  getRecentPurchasedList() {
    const currentUser = this.authserv.getUser();
    console.log('rencent pruchased inside');

    let headers = new HttpHeaders().set('Authorization', currentUser.token);
    this.api.get(`promotions/purchaselist`, { headers }).subscribe((r: any) => {
      console.log('rencent pruchased inside two ', r);
      this.listpromotions = r.reverse();

      this.listpromotions[0].status === 1;
      if (this.listpromotions[0].status === 1) {
        console.log('status active');
      }

      // console.log("array objects" ,this.listpromotions[0].status);
    });
  }
}
