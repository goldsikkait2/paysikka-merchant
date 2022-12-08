import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-firstpagepromotion',
  templateUrl: './firstpagepromotion.component.html',
  styleUrls: ['./firstpagepromotion.component.scss']
})
export class FirstpagepromotionComponent implements OnInit {
  lengthofPomotions: any;
  lengthofPomotionslength: any;

  constructor(private authserv: AuthService, private api:ApiService) { }

  ngOnInit(): void {
    this.getListOfPromotions();
  }
  getListOfPromotions(){
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`promotions/list`,{headers}).subscribe((r: any) => {
      this.lengthofPomotions = r;
      this.lengthofPomotionslength = this.lengthofPomotions.length
    console.log("lenghtoftotalpromotions" ,this.lengthofPomotionslength);
    
      
    });
  }
}
