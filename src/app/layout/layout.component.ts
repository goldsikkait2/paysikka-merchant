import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../service/side-nav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  opened:boolean=true;
  constructor(private sideNavService:SideNavService) {
    this.sideNavService.toggle$.subscribe((res:any)=>{
      this.opened=res;
    })
   }

  ngOnInit(): void {
  }

}
