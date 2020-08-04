import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item-master-item',
  templateUrl: './add-item-master-item.page.html',
  styleUrls: ['./add-item-master-item.page.scss'],
})
export class AddItemMasterItemPage implements OnInit {

  formData = {
    itemName: '',
    hsnCode: '',
    itemPrice: '',
    unit: '',
    gst: '',
    per:'',
    companyId: null
  }
  constructor(
    public httpClient: HttpClient,
    public shared: ShareddataService,
    public config: ConfigProvider,
    public route: ActivatedRoute,
    public router: Router
  ) {

  }
 
  ngOnInit() {

  }
  addItem() {
    this.shared.presentLoading();
    this.formData.companyId = this.shared.companyData.companyId;
    this.httpClient.post(this.config.url + 'itemmaster/addItemMaster', this.formData).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.presentSuccessToast(data.message);
        this.router.navigateByUrl('/itemmaster');
      } else {
        this.shared.presentDangerToast(data.message);
      }
    });
  }
}
