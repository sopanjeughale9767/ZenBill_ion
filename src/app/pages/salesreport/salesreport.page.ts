import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-salesreport',
  templateUrl: './salesreport.page.html',
  styleUrls: ['./salesreport.page.scss'],
})
export class SalesreportPage implements OnInit {

  datesForm = {
    sDate: null,
    eDate: null,
    date: null
  }



  
  tblIsShow: boolean = false;
  templateNumber: string;
  keyValue: string;
  invoicData = {};
  constructor(public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: ShareddataService,
    public router: Router,
    private datePipe: DatePipe



  ) { }


  
  ngOnInit() {
  }



  getInvByDate(date) {
    this.datesForm.date = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.httpClient.post(this.config.url + 'report/getReportByDate', this.datesForm).subscribe((res: any) => {
      if (res.status == true) {
        this.tblIsShow = true;
        this.invoicData = res.data;
      }
    });
  }

  invociceDetails(obj){
    debugger
    this.shared.invoiceData  = Object.assign({}, obj);
    this.httpClient.post(this.config.url + 'customer/getCustomer', obj).subscribe((res: any) => {
      if (res.status == true) {
        this.shared.customerData = res.data[0];
        this.router.navigateByUrl("/template1");
      }
    });




    
  }
  submit() {
    if(this.datesForm.sDate && this.datesForm.eDate != null)
    {
      this.httpClient.post(this.config.url + 'report/getReportBetDate', this.datesForm).subscribe((res: any) => {
        if (res.status == true) {
          this.tblIsShow = true;
          this.invoicData = res.data;
          console.log(this.invoicData);
        }
      });
    }

  }

}
