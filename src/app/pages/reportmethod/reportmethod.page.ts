import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reportmethod',
  templateUrl: './reportmethod.page.html',
  styleUrls: ['./reportmethod.page.scss'],
})
export class ReportmethodPage implements OnInit {

  constructor(
    public shared: ShareddataService,
    public router: Router
  ) { }

  ngOnInit() {
 
  }

  report(){
this.router.navigateByUrl("/salesreport");
  }

}
