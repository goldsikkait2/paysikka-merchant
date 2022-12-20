import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/_services/auth.service';
// import { NgModule, VERSION, Pipe, PipeTransform} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-listoftransactions',
  templateUrl: './listoftransactions.component.html',
  styleUrls: ['./listoftransactions.component.scss']
})

export class ListoftransactionsComponent implements OnInit {
  ListofTransactions!: object;
  term:any;
  Search: any;
  searchTerm: any;
  collection = [];
 
  page : number = 1;
  constructor(private authserv:AuthService, private api:ApiService) { 
    setInterval(()=>{
      this.getListOfTransactions()
    },1000)
   
  }
  searchText:any
  ngOnInit(): void {
    
   
   
  }
  
  getListOfTransactions(){
    const currentUser = this.authserv.getUser();

    let headers= new HttpHeaders().set('Authorization',currentUser.token)
    this.api.get(`dashboard/transactions??page=${this.page}`,{headers}).subscribe((r: any) => {
      this.ListofTransactions = r.reverse();
      console.log(r);
      
      console.log("ListofTranscactions" , this.ListofTransactions);
      
    });
  }

  pageChanged(pageNumber:any) {
    this.page = pageNumber;
    this.getListOfTransactions();
   
  }

}
