import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-item-master-item',
  templateUrl: './add-item-master-item.page.html',
  styleUrls: ['./add-item-master-item.page.scss'],
})
export class AddItemMasterItemPage implements OnInit {

  today = new Date();

  constructor(
    public httpClient: HttpClient,
    public shared: ShareddataService,
    public config: ConfigProvider,
    public route: ActivatedRoute,
    public datepipe: DatePipe,
    public router: Router
  ) { }

  ngOnInit() {
    if (this.shared.itemMasterDataIsShow == false) {
      this.shared.itemMasterForm = {
        itemMasterId: null,
        itemName: '',
        hsnCode: '',
        itemPrice: '',
        unit: '',
        gst: '',
        cgst: '',
        sgst: '',
        igst: '',
        companyId: null,
        isActive: null,
        per: '',
        stock: null
      };
      
      this.shared.stockForm = {
        stockDetailsId: null,
        stock: null,
        stockRefCode: '', 
        stockDate: '', 
        itemMasterId: null
      }
    }
  }

  addItem() {
    if (this.shared.itemMasterForm.itemMasterId == null) {
      this.shared.itemMasterForm.companyId = this.shared.companyData.companyId;
      this.httpClient.post(this.config.url + 'itemmaster/addItemMaster', this.shared.itemMasterForm).subscribe((res: any) => {
        if (res.status == true) {
          this.httpClient.get(this.config.url + 'itemmaster/getLast').subscribe((res: any) => {
            if (res.status == true) {
              this.shared.stockForm.stockDate = this.datepipe.transform(this.today, 'yyyy-MM-dd');
              this.shared.stockForm.itemMasterId = res.data[0].itemMasterId;
              this.shared.stockForm.stock = this.shared.itemMasterForm.stock;
              this.httpClient.post(this.config.url + 'stock/addStock', this.shared.stockForm).subscribe((res: any) => {
                if(res.status == true){
                  if(this.shared.navigateToSearchItem == true){
                    this.router.navigateByUrl("/searchitem");
                  } 
                  else{
                    this.router.navigateByUrl('/itemmaster');
                  }
                }
              });
            }
          });
          this.shared.presentSuccessToast(res.message);
        } else {
          this.shared.presentDangerToast(res.message);
        }
      }); 
    }
    else {
      this.httpClient.post(this.config.url + 'itemmaster/updateItemMaster', this.shared.itemMasterForm).subscribe((res: any) => {
        if (res.status == true) {
          this.shared.stockForm.stockDate = this.datepipe.transform(this.today, 'yyyy-MM-dd');
          this.shared.stockForm.itemMasterId =  this.shared.itemMasterForm.itemMasterId;
          this.shared.stockForm.stock = this.shared.itemMasterForm.stock;
          this.httpClient.post(this.config.url + 'stock/addStock', this.shared.stockForm).subscribe((res: any) => {
            if(res.status == true){
              this.router.navigateByUrl('/itemmaster');
            }
          });
          this.shared.itemMastersData = res.result;
          this.shared.presentSuccessToast(res.message);
          this.router.navigateByUrl('/itemmaster');
        } else {
          this.shared.presentDangerToast(res.message);
        }
      })
    }
  }
}
