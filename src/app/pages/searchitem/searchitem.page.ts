import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-searchitem',
  templateUrl: './searchitem.page.html',
  styleUrls: ['./searchitem.page.scss'],
})
export class SearchitemPage implements OnInit {
  // searchItems: any;
  // isItemAvailable: boolean=false;
  searchItems = [];
  
  formData={
    
  } 
  isSearch: boolean;
  constructor(
    public httpClient :  HttpClient,
    public shared : ShareddataService,
    public config : ConfigProvider,
    public router : Router,
    public route:ActivatedRoute

  ) { 

    this.route.params.subscribe(val => {
      this.getItemMaster();
    });
  }
 

  ngOnInit() {

  }

  getItemMaster(){
     var object: { [k: string]: any } = {};
     object.companyId = this.shared.companyData.companyId;
     this.httpClient.post(this.config.url + 'itemMaster/getAll', object).subscribe((res: any) => {
       if (res.status == true) {
         this.searchItems = res.data;
       } else {
         this.router.navigateByUrl('/additem');
       }
     });
}
  


addNewItem(){
  this.shared.navigateToSearchItem = true;
  this.shared.itemMasterDataIsShow = false;
  this.router.navigateByUrl("/addItemMasterItem");
}
  onSearchChange(ev: any) {
    const val = ev.target.value;
    if (val.replace(/\s/g, "").length < 1) {
      var dat: { [k: string]: any } = {};
      dat.key = val.toString();
      dat.companyId = this.shared.companyData.companyId;
      this.httpClient.post(this.config.url + 'itemMaster/getAll',dat).subscribe((res: any) => {
        if (res.status == true) {
          this.searchItems = res.data;
        } else { 
          this.shared.presentDangerToast("Failed..");
        }
      });
    }
    else {
       
      // this.shared.presentLoading();
      var dat: { [k: string]: any } = {};
      dat.key = val.toString()
      dat.companyId = this.shared.companyData.companyId;
      this.httpClient.post(this.config.url + 'itemMaster/searchItemMaster' ,dat).subscribe((res: any) => {
        if (res.status == true) {
          // this.isItemAvailable = true;
          // this.shared.presentSuccessToast(data.message);
          this.searchItems = res.data;
        } else {
          // this.isItemAvailable = false;
          // this.shared.presentDangerToast(res.message);
        }
      });
    }
  }
 
  getItemDetails(item) {
    debugger
this.shared.itemMasterInStock = item.stock;
    this.shared.formData =item;
    this.shared.formData.itemMasterId = item.itemMasterId;
    this.shared.isSearch = true;
    this.router.navigateByUrl('/addproduct');
     
    // this.shared.presentLoading();
    // var dat: { [k: string]: any } = {};
    // dat.itemId = itemId;
    // dat.companyId = this.shared.companyData.companyId;
    // this.httpClient.post(this.config.url + 'itemMaster/getItemById',dat).subscribe((data: any) => {
    //   if (data.status == true) {
    //     this.shared.formData = data.result[0];
    //     // this.shared.customerData = data.result[0];
    //     console.log(this.shared.customerData);
    //     this.shared.isSearch = true;
    //     // this.isItemAvailable = false;
    //     this.ngOnDestroy();
    //     this.router.navigateByUrl('/addproduct');
    //     this.shared.presentSuccessToast(data.message);
    //   } else {
    //     this.shared.presentDangerToast(data.message);
    //   }

    // })
  }
}
