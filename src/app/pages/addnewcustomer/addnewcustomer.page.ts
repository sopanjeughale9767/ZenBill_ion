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
  isItemAvailable = false;

  formData = {
    custName: '',
    custAddress: '',
    custGstNumber: '',
    custStateName: '',
    custCode: '',
    companyId:'',
    custMobile:''
  }
  isShow: boolean = false;
  customers: string[];
  constructor(
    public shared: ShareddataService,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public router: Router
  ) {
  }

  ngOnInit() {
 
  }

  add() {
    debugger
    this.shared.presentLoading();
    this.formData.companyId= ''+this.shared.companyData.companyId;
    this.httpClient.post(this.config.url + 'customer/addCustomer', this.formData).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.customerData = data.result[0]; 
        this.shared.presentSuccessToast(data.message);
        this.router.navigateByUrl('/addcustomer');
      } else {
        this.shared.presentDangerToast(data.message);

      }
    });
  }
}
