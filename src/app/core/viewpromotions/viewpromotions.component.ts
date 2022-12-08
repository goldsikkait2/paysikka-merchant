import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-viewpromotions',
  templateUrl: './viewpromotions.component.html',
  styleUrls: ['./viewpromotions.component.scss']
})
export class ViewpromotionsComponent implements OnInit {
  ListofPomotionById: any;
  promotionid: any;
  paramGlobal: any;

  constructor( private authserv: AuthService, private api: ApiService, private router: ActivatedRoute) { 
   
  }

  ngOnInit(): void {
   
  //   this.router.params.subscribe((params)=>{
  //     // console.log("params", params.id);
  //     this.paramGlobal = params['id']
  //     console.log("dsfgfdgfg", this.paramGlobal);

  //  this.getListOfPromotions();
  //   })

    this.getListOfPromotions()
  }
  getListOfPromotions(){
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`promotions/package/${this.promotionid.id}`,{headers}).subscribe((r: any) => {
      this.ListofPomotionById = r;
      console.log(r);
      
      console.log("ListofPomotionById" , this.ListofPomotionById);
      
    });
  }

}
