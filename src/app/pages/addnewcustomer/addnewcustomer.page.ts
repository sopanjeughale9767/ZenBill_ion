import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addnewcustomer',
  templateUrl: './addnewcustomer.page.html',
  styleUrls: ['./addnewcustomer.page.scss'],
})
export class AddnewcustomerPage implements OnInit {

  customers: string[];

  constructor(
    public shared: ShareddataService,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public router: Router
  ) {
  }

  ngOnInit() {
    if (this.shared.customerDataIsShow == false) {
      this.shared.customerFormData = {
        custId: null,
        custName: '',
        custAddress: '',
        custGstNumber: '',
        custStateName: '',
        custCode: '',
        companyId: '',
        custMobile: ''
      }
    }
  }

  add() {
    if (this.shared.customerFormData.custId == null) {
      // this.shared.presentLoading();
      this.shared.customerFormData.companyId = '' + this.shared.companyData.companyId;
      this.httpClient.post(this.config.url + 'customer/addCustomer', this.shared.customerFormData).subscribe((res: any) => {
        if (res.status == true) {
          // this.shared.customerData = res.result;
          this.shared.presentSuccessToast(res.message);
        } else {
          this.shared.presentDangerToast(res.message);
        }
      });
    }
    else {
      this.httpClient.patch(this.config.url + 'customer/updateCustomer/', this.shared.customerFormData).subscribe((res: any) => {
        if (res.status == true) {
          this.shared.presentSuccessToast(res.message);
        } else {
          this.shared.presentDangerToast(res.message);
        }
      });
    }


    this.router.navigateByUrl('/searchcustomer');

  }
}
