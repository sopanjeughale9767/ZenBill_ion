import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addcustomermodal',
  templateUrl: './addcustomermodal.component.html',
  styleUrls: ['./addcustomermodal.component.scss'],
})
export class AddcustomermodalComponent implements OnInit {

  isItemAvailable = false;
  data = {
    custName: '',
    custMobile: '',
    custAddress: '',
    custGstNumber: '',
    custStateName: '',
    custCode: '',
  }

  isShow: boolean = false;
  customers: string[];

  constructor(
    public shared: ShareddataService,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public router: Router,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {

  }

  add() {
    debugger
    this.shared.presentLoading();
    this.httpClient.post(this.config.url + 'customer/addCustomer', this.data).subscribe((data: any) => {
      if (data.status == true) {
        this.dismiss();
        this.shared.presentSuccessToast('Success');
      } else {
        this.shared.presentDangerToast('Failed..');
      }
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
}
