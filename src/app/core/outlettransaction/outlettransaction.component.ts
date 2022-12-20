import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  routerStore: any;
  paramGlobal: any;
  filterdata!: any[]

  constructor( private authserv: AuthService, private api: ApiService,private router:ActivatedRoute) { }

  ngOnInit(): void {
   


   this.getListOfOutletTransactions();
  }
  getdata(paramGlobal:any){
    const currentUser = this.authserv.getUser();
    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`outlet/list`,{headers}).subscribe((r: any) => {

console.log(`main data`,r,paramGlobal.id)
let ids =paramGlobal.id
 this.filterdata = [...r.filter((product:{upiid: any;}) => product.upiid===ids)]
    console.log(`filtered data`,this.filterdata,)
      
    });
  }
  getListOfOutletTransactions(): void {
    
    
    const currentUser = this.authserv.getUser();
    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`outlet/transactions/${this.paramGlobal.id}`,{headers}).subscribe((r: any) => {
     this.response = r.reverse();
      console.log("responsechild" ,this.response ,);
      
    });
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
