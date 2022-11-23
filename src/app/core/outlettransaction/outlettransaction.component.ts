import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-outlettransaction',
  templateUrl: './outlettransaction.component.html',
  styleUrls: ['./outlettransaction.component.scss']
})
export class OutlettransactionComponent implements OnInit {
  response: any;
  lengthResponse: any;

  constructor( private authserv: AuthService, private api: ApiService) { }

  ngOnInit(): void {
    // this.getListOfOutletTransactions();
  }
  // getListOfOutletTransactions(): void {
  //   const currentUser = this.authserv.getUser();

  //   let headers= new HttpHeaders().set('Authorization',currentUser.token)
  //   this.api.get(`outlet/transactions/:${{upiid}}`,{headers}).subscribe((r: any) => {
  //    this. response = r
  //    this.lengthResponse =r.length
  //    console.log("length" , this.lengthResponse);
     
  //     console.log("response" ,r );
      
  //   });
  // }

}
