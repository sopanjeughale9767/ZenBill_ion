import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-itemmaster',
  templateUrl: './itemmaster.page.html',
  styleUrls: ['./itemmaster.page.scss'],
})
export class ItemmasterPage implements OnInit {
  // itemMastersData: any;
  gst: string;
  isIntra: boolean = true;
  itemMastersData = new Array;

  constructor(
    public shared: ShareddataService,
    public config: ConfigProvider,
    public httpClient: HttpClient,
    public router: Router,
    public route:ActivatedRoute
  ) {
    this.route.params.subscribe(val => {
      this.getItemMaster();
    });

  }

  ngOnInit() {
  }

 
  
  // to get all item masters by comapny id
  getItemMaster() {
    var object: { [k: string]: any } = {};
    object.companyId = this.shared.companyData.companyId;
    this.httpClient.post(this.config.url + 'itemmaster/getAll', object).subscribe((res: any) => {
      if (res.status == true) {
        this.itemMastersData = res.data;
      } else {
        this.shared.presentDangerToast(res.message);
      }
    });
  }

  // add new item master
   addNewItem(){
     this.shared.navigateToSearchItem = false;
      this.shared.itemMasterDataIsShow = false;
      this.router.navigateByUrl("/addItemMasterItem");
  }
  // update item master
  updateItem(item) {
    this.shared.itemMasterDataIsShow = true;
    this.shared.itemMasterForm = Object.assign({}, item);
    this.router.navigateByUrl("/addItemMasterItem");
  }

  // update stock of item master
  updateStock(item) {
    this.shared.itemMasterForm = Object.assign({}, item);
    this.router.navigateByUrl("/item-master-stock");
  }

  // delete item master
  deleteItem(obj) {
    this.httpClient.post(this.config.url + 'itemmaster/deleteItemMaster/', obj).subscribe((res: any) => {
      if (res.status == true) {
        this.shared.presentSuccessToast(res.message);
        this.getItemMaster();
      } else {
        this.shared.presentDangerToast(res.message);
      }
    });
  }

}
