import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})
export class PromotionsComponent implements OnInit {
  lengthofPomotions: any;
  length: any;
  lengthofwebsite: any;
  filterdataWebLength!: any[];

  constructor(private authserv : AuthService, private api: ApiService) { }

  ngOnInit(): void {
    this.getListOfPromotions()
  }
  getListOfPromotions(){
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`promotions/list`,{headers}).subscribe((r: any) => {
      this.lengthofPomotions = r;
      this.lengthofwebsite= this.lengthofPomotions.length
      this.filterdataWebLength = [...r.filter((promtion:{promotiontype: any;}) => promtion.promotiontype==='Website Promotion')]
      console.log("dfsfdsfdsfdsfds", this.filterdataWebLength.length);
      
      console.log("LengthofWebsite" , this.lengthofPomotions);
      
    });
  }
 

}
