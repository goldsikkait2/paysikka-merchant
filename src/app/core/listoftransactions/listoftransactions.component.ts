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
  ListofTransactions: any;
  term:any;
  Search: any;
  searchTerm: any;
  constructor(private authserv:AuthService, private api:ApiService) { }

  ngOnInit(): void {
    this.getListOfTransactions()
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
  

}
