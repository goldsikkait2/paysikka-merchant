import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor( public appService:AppService,private router: Router ) { 
    appService.showNavigation$.next(false);
   
  }

  ngOnInit(): void {
    this.router.navigate(['/dashboard'])
    .then(() => {
   window.location.reload();
    });
  
  }
  

}
