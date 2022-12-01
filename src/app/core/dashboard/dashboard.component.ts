import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { ChartData, ChartOptions } from 'chart.js';
import { saveAs} from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service'; 
import{HttpHeaders,HttpClient}from'@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  popup = false
  response: any;
  totalAmount:any;
  totalwalletpoint: any;
  collectedwalletpoint: any;
  ListofTransactions: any;
  term:any;
  localstorageData: any;
  store: any
  localstroageUpiid: any;
  localstorageQrcode: any;
 
  
  
  constructor( private http:HttpClient,private authserv:AuthService, private router: Router , private toastr: ToastrService, private api: ApiService) { }
  

  ngOnInit(): void {
   
   this.store= localStorage.getItem('user');
  this.localstorageData=JSON.parse(this.store)
  this.localstroageUpiid = this.localstorageData.user.upiid
  this.localstorageQrcode = this.localstorageData.user.Qrcode

   console.log("keys" , this.localstorageQrcode, this.localstroageUpiid  );

   
   
   
   if(!this.store){
    this.router.navigate(['/auth']);

   }
   
    this.getTransactions();
    this.getTotalAmount();
    this.getTotalWalletPoints();
    this.getCollectedWalletPoints();
    this.getListOfTransactions();
    
 
  }
 
  getTransactions(): void {
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`dashboard/transactions`,{headers}).subscribe((r: any) => {
      this.response = r.length;
      console.log("res" , this.response);
      
    });
  }
  getTotalAmount(): void {
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`dashboard/totalamount`,{headers}).subscribe((r: any) => {
      this.totalAmount = r.totalamountreceived;
      console.log("totalamount" , this.totalAmount);
      
    });
  }
  getTotalWalletPoints(): void {
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`dashboard/totalwalletpoints`,{headers}).subscribe((r: any) => {
      this.totalwalletpoint = r.points;
      console.log("totalwalletpoint" , this.totalwalletpoint);
      
    });
  }
  getCollectedWalletPoints(): void {
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`dashboard/totalwalletpoints`,{headers}).subscribe((r: any) => {
      this.collectedwalletpoint = r.points;
      console.log("collectedwalletpoint" , this.collectedwalletpoint);
      
    });
  }
 
  getListOfTransactions(){
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`dashboard/transactions`,{headers}).subscribe((r: any) => {
      this.ListofTransactions = r;
      console.log(r);
      
      console.log("ListofTranscactions" , this.ListofTransactions);
      
    });
  }

  downloadImg(url:any,name:any){
    saveAs(url, name+'.png');
  }
 
 
}


