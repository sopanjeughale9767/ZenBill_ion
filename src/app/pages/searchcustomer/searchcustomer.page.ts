import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.page.html',
  styleUrls: ['./searchcustomer.page.scss'],
})
export class SearchcustomerPage implements OnInit {
  customers: any;
  isItemAvailable: boolean = false;

  constructor(
    public shared: ShareddataService,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public router: Router
  ) { }

  ngOnInit() {
    this.shared.presentLoading();
    var dat: { [k: string]: any } = {};
    // dat.custid = localStorage.getItem('custId');;
    debugger
    dat.companyId = this.shared.companyData.companyId;
    dat.isSelectGST=this.shared.isSelectGST;
    this.httpClient.post(this.config.url + 'customer/getAll', dat).subscribe((data: any) => {

      if (data.status == true) {
        this.isItemAvailable = true;
        this.customers = data.result;
        this.shared.presentSuccessToast(data.message);
      } else {
        this.shared.presentDangerToast(data.message);
      }
    });
  }

  getCustomer(ev: any) {

    const val = ev.target.value;
    if (val.replace(/\s/g, "").length < 1) {
      var dat: { [k: string]: any } = {};
      // dat.custid = localStorage.getItem('custId');;
      dat.companyId =this.shared.companyData.companyId;
    dat.isSelectGST=this.shared.isSelectGST;
if(dat.companyId ==null)
this.router.navigateByUrl('/addnewcustomer');// if data not load from localstorage of companyData then redirect to unother page
      this.httpClient.post(this.config.url + 'customer/getAll', dat).subscribe((data: any) => {
        this.customers = data.result;
        if (data.status == true) {
         
        } else {
          this.router.navigateByUrl('/addnewcustomer');
        }
      });
    } else {
      // this.shared.presentLoading();
      var dat: { [k: string]: any } = {};
      dat.key = val.toString()
      dat.companyId =this.shared.companyData.companyId;
    dat.isSelectGST=this.shared.isSelectGST;

      this.httpClient.post(this.config.url + 'customer/searchCustomer', dat).subscribe((data: any) => {
        if (data.status == true) {
          this.isItemAvailable = true;
          this.customers = data.result;
          console.log(data);
        } else {
          this.isItemAvailable = false;
          // this.shared.presentDangerToast("data.message");
        }
      });
    }

  }

  getCustomerDetails(custId) {
    debugger 
    var dat: { [k: string]: any } = {}; 
    dat.custId = custId;
    dat.companyId = this.shared.companyData.companyId;
    dat.isSelectGST=this.shared.isSelectGST;

    this.httpClient.post(this.config.url + 'customer/getCustomer', dat).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.customerData = data.result[0];
        if(this.shared.isRouteByInvoice)
        this.router.navigateByUrl('/invoice');
else
        this.router.navigateByUrl('/addcustomer');
// this.shared.presentSuccessToast(data.message);
      } else {
        this.shared.presentDangerToast(data.message);
      }
    });
  }

}
