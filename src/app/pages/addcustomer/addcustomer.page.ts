import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddcustomermodalComponent } from 'src/app/components/addcustomermodal/addcustomermodal.component';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.page.html',
  styleUrls: ['./addcustomer.page.scss'],
})
export class AddcustomerPage implements OnInit {
  customers: any;
  isItemAvailable: boolean;
  showCard: boolean;
  

  constructor(
    public httpClient : HttpClient,
    public config : ConfigProvider,
    public shared : ShareddataService,
    public router : Router,
    public modalController : ModalController
  ) { 
    
  }

  ngOnInit() {
    this.shared.showCard=false;
    this.shared.itemData=[];
  }

  getCustomer(ev: any) {

    const val = ev.target.value;
    if (val.replace(/\s/g, "").length < 1) {
      var dat: { [k: string]: any } = {};
      dat.custid=localStorage.getItem('custId');;
      dat.companyId=this.shared.companyData.companyId
      this.httpClient.post(this.config.url + 'customer/getAll',dat).subscribe((data: any) => {
        this.customers = data.result;
      });
    } else {
      this.shared.presentLoading();
      this.httpClient.get(this.config.url + 'customer/searchCustomer/' + val.toString()).subscribe((data: any) => {

        if (data != null) {
          this.isItemAvailable = true;
          this.customers = data.result;
      
        } else {
          this.isItemAvailable = false;

          this.shared.presentDangerToast(data.message);
        }
      });
    }

  }

  getCustomerDetails(custId) {
    
    var dat: { [k: string]: any } = {};
    dat.custid=custId;
    dat.companyId=this.shared.companyData.companyId;
    this.httpClient.post(this.config.url + 'customer/getCustomer',dat).subscribe((data: any) => {
     if(data.status == true){
      this.shared.customerData = data.result[0];
      
      this.customers=data.result[0];
      localStorage.setItem('custGst',data.result[0].custGstNumber);
      localStorage.setItem('custId',data.result[0].custId);
      this.showCard=true;
      this.isItemAvailable = false;
      this.shared.presentSuccessToast(data.message);
    }else{
      this.shared.presentDangerToast(data.message);
    }
  });
  






}


  async addCustomerModal() {
    const modal = await this.modalController.create({
      component: AddcustomermodalComponent
    });
    return await modal.present();
  }
}
