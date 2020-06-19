import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  invoices: any;
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
    dat.custId=this.shared.customerData.custId;
    this.httpClient.post(this.config.url + 'invoice/getAll', dat).subscribe((data: any) => {

      if (data.status == true) {
        this.isItemAvailable = true;
        this.invoices = data.result;
        this.shared.presentSuccessToast(data.message);
      } else {
        this.shared.presentDangerToast(data.message);
      }
    });
  }

  getInvoice(ev: any) {

    const val = ev.target.value;
   {
      // this.shared.presentLoading();
      var dat: { [k: string]: any } = {};
      dat.key = val.toString()
      dat.companyId = this.shared.companyData.companyId;
      dat.custId=this.shared.customerData.custId;

      this.httpClient.post(this.config.url + 'invoice/searchInvoice', dat).subscribe((data: any) => {
        if (data.status == true) {
          this.isItemAvailable = true;
          this.invoices = data.result;
          console.log(data);
        } else {
          this.isItemAvailable = false;
          // this.shared.presentDangerToast("data.message");
        }
      });
    }

  }
  getInvoiceData(data){
    this.shared.invoiceData = data;
let templateNumber='';

    templateNumber = localStorage.getItem('number');
    if (parseInt(templateNumber) == 1) {
      this.router.navigateByUrl("/template1");
    } else {
      if (parseInt(templateNumber) == 2) {
        this.router.navigateByUrl("/template2");
      } else {
        if (parseInt(templateNumber) == 3) {
          this.router.navigateByUrl("/template3");
        } else {
          if (parseInt(templateNumber) == 4) {
            this.router.navigateByUrl("/home");
          } else {
            this.router.navigateByUrl("/home");
          }
        }
      }
    }
  }

}