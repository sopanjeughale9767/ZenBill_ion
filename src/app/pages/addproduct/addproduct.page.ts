import { Component, OnInit } from '@angular/core';
import { ConfigProvider } from 'src/app/providers/config/config';
import { HttpClient } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  formData = {
    hsnCode: null,
    itemName: null,
    quantity: null,
    rate: null,
    unit: null,
    gst: null,
    discount: 0

  }
  invoiceId: any;
  isSearch: boolean = false;
  isItemAvailable = false;
  searchItems: string[];
  showTable: boolean = false;
  showButton: boolean = false;

  constructor(
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public shared: ShareddataService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    public router: Router,
    public alertController: AlertController,
    public alertCtrl: AlertController
  ) {
    this.invoiceId = this.route.snapshot.paramMap.get('id');
    console.log(this.invoiceId);
  }

  ngOnInit() {
    this.onSearchChange("");
  }


 

  onSearchChange(ev: any) {
     debugger
    const val = ev.target.value;
    if (val.replace(/\s/g, "").length < 1) { 
      var dat: { [k: string]: any } = {};
      dat.custid=this.shared.customerData.custid;
      dat.companyId=this.shared.companyData.companyId;
      this.httpClient.post(this.config.url + 'itemMaster/getAll',dat).subscribe((data: any) => {
        if (data.status == true) {
          this.searchItems = data.result;
          this.isItemAvailable = true;
          this.shared.presentSuccessToast("Success..");
        } else {
          this.shared.presentDangerToast("Failed..");
        }
      });
    }
    else {
      this.shared.presentLoading();
      var dat: { [k: string]: any } = {};
      dat.key = val.toString()
      dat.companyId = this.shared.companyData.companyId;
      this.httpClient.get(this.config.url + 'itemMaster/searchItemMaster', dat).subscribe((data: any) => {
        if (data.status == true) {
          this.isItemAvailable = true;
          this.shared.presentSuccessToast("Success..");
          this.searchItems = data.result;
        } else {
          this.shared.presentDangerToast("Failed..");
        }
      });
    }
  }

  getItemDetails(itemId) {
    this.shared.presentLoading();
    this.httpClient.get(this.config.url + 'itemMaster/getItemById/' + itemId).subscribe((data: any) => {
      if (data.status == true) {
        this.formData = data.result[0];
        this.shared.customerData = data.result[0];
        console.log(this.shared.customerData);
        this.isSearch = true;
        this.isItemAvailable = false;
        this.shared.presentSuccessToast("Success");
      } else {
        this.shared.presentDangerToast("Failed..");
      }

    })
  } 

  addProduct() {
     
    if(this.shared.itemData.filter(x => x.itemId == this.shared.formData.itemId).length!=0){
      const index = this.shared.itemData.indexOf(this.shared.formData, 0);
      // delete this.shared.itemData[key];

if (index > -1) {
  this.shared.itemData.splice(index, 1);
}
    }
    this.shared.itemData.push(this.shared.formData);
    // console.log(this.shared.itemData);
    this.showTable = true;
    this.showButton = true;
    this.shared.isSearch = false;
    this.shared.formData = {
      itemId:null,
      hsnCode: null,
      itemName: null,
      quantity: null,
      rate: null,
      unit: null,
      gst: null,
      discount: null
    };
 
}

  removeItem1(key) {
    const index = this.shared.itemData.findIndex(i => i.itemId === key);
    this.shared.itemData.splice(index, 1);
  }

  async removeItem(key) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to permanently delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            const index = this.shared.itemData.findIndex(i => i.itemId === key);
            this.shared.itemData.splice(index, 1);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
}
