import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-listofoutlets',
  templateUrl: './listofoutlets.component.html',
  styleUrls: ['./listofoutlets.component.scss']
})
export class ListofoutletsComponent implements OnInit {
  response: any;
  lengthResponse: any;

  constructor(private authserv:AuthService,private api:ApiService) { }

  ngOnInit(): void {
    this.getListOfOutlet()
  }
  getListOfOutlet(): void {
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`outlet/list`,{headers}).subscribe((r: any) => {
     this.response = r
     this.lengthResponse =r.length
     console.log("length" , this.lengthResponse);
     
      console.log("responseupiidfdf" ,this.response);
      for(let data of this.response){
        console.log('sasassas',data.upiid)
      }
    });
  }

}
