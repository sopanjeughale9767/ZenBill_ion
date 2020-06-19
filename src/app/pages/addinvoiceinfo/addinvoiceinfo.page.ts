import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfigService } from 'src/app/provider/config.service';

@Component({
  selector: 'app-addinvoiceinfo',
  templateUrl: './addinvoiceinfo.page.html',
  styleUrls: ['./addinvoiceinfo.page.scss'],
})
export class AddinvoiceinfoPage implements OnInit {

  formData = {
    companyId:this.shared.companyData.companyId,
    invoiceNumber: '',
    invoiceDate: '',
    custId: null,
    deliveryTerms: '',
    deliveryNote: '',
    paymentMode: '',
    supplierRef: '',
    otherRef: '',
    items: [],
    byersOrderNumber: '',
    byersDate: '',

    despatchThrough: '',
    destination: '',
    declaration: '',
    totalSgstAmount: 0,
    totalCgstAmount: 0,
    totalIgstAmount: 0,
    note: ''
  }
  gst: string;
  templateNumber: string;
  isStart = true;
  constructor(
    public shared: ShareddataService,
    public httpClient: HttpClient,
    public config: ConfigService,
    public router: Router,
    public datepipe: DatePipe
  ) {
    // debugger

  }

  ngOnInit() {
  }

  onChange(paymentMode) {
    debugger
    var dat: { [k: string]: any } = {};
    dat.companyId = this.shared.companyData.companyId;
    dat.paymentMode = paymentMode;

    this.config.postHttp('invoice/getInvoiceById/0', dat).then((result: any) => {

      this.shared.invoiceNumber = this.formData.invoiceNumber = (result.result[0].invoiceNumber + 1);

      if (this.shared.invoiceNumber==1 ) {
        this.isStart = false;
      }
      // this.formData.invoiceDate = this.datepipe.transform(new Date(), 'dd-mm-yyyy');
    });

  }
  saveInvoice() {
    debugger

    //

    if (this.shared.isSelectGST) {
      debugger
      if (this.shared.customerData.custGstNumber.substring(0, 2) == this.shared.companyData.companyGstNo.substring(0, 2)) {
        this.shared.itemData.forEach(element => {
          element.cgst = element.gst / 2;
          element.sgst = element.gst / 2;
          element.igst = 0;

        })
      } else {
        this.shared.itemData.forEach(element => {
          element.cgst = 0;
          element.sgst = 0;
          element.igst = element.gst;
        })
      }
    }
    this.shared.presentLoading();
    this.formData.items = this.shared.itemData;

    this.formData.custId = this.shared.customerData.custId;
    debugger
    this.httpClient.post(this.config.url + 'invoice/saveInvoice', this.formData).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.invoiceData = data.result[0];

        this.shared.presentSuccessToast(data.message);
        this.templateNumber = localStorage.getItem('number');
        if (parseInt(this.templateNumber) == 1) {
          this.router.navigateByUrl("/template1");
        } else {
          if (parseInt(this.templateNumber) == 2) {
            this.router.navigateByUrl("/template2");
          } else {
            if (parseInt(this.templateNumber) == 3) {
              this.router.navigateByUrl("/template3");
            } else {
              if (parseInt(this.templateNumber) == 4) {
                this.router.navigateByUrl("/home");
              } else {
                this.router.navigateByUrl("/home");
              }
            }
          }
        }
      } else {
        this.shared.presentDangerToast(data.message);
      }

    })
  }
}
