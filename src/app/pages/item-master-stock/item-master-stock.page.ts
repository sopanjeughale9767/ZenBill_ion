import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-master-stock',
  templateUrl: './item-master-stock.page.html',
  styleUrls: ['./item-master-stock.page.scss'],
})
export class ItemMasterStockPage implements OnInit {




  constructor(
    public shared: ShareddataService,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public router: Router
  ) { }

  ngOnInit() {
    this.shared.itemMasterForm;
    console.log(this.shared.itemMasterForm.itemName)
  }

  updateItem(){
    this.httpClient.post(this.config.url + 'itemmaster/updateItemMaster',  this.shared.itemMasterForm).subscribe((res: any) => {
      if (res.status == true) {
        this.shared.itemMastersData = res.result;
        this.shared.presentSuccessToast(res.message);
        this.router.navigateByUrl('/itemmaster');
      } else {
        this.shared.presentDangerToast(res.message);
      }
    })
  }
}
