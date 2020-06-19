import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {
  companyId: number;

  constructor(
    public router: Router,
    public shared: ShareddataService,
    public httpClient: HttpClient,
    public config: ConfigProvider
  ) {
   
  }

  ngOnInit() {

  }

  onCustomer(bit) {
    debugger
    if (bit == 1) {
      if (this.shared.isGSTCompany) {
        this.shared.isSelectGST = true;
        this.router.navigateByUrl('/searchcustomer');
      } else {
        this.shared.presentAlert('Warning', 'Please first enter your company GST number in the company profile');
      }
    } else {
      this.shared.isSelectGST = false;
      this.router.navigateByUrl('/searchcustomer');
    }

  }
}
