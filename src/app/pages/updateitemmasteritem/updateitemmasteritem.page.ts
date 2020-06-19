import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';

@Component({
  selector: 'app-updateitemmasteritem',
  templateUrl: './updateitemmasteritem.page.html',
  styleUrls: ['./updateitemmasteritem.page.scss'],
})
export class UpdateitemmasteritemPage implements OnInit {
  id: number;
  formData = {
    itemName: '',
    hsnCode: '',
    itemPrice: '',
    unit: '',
    gst: '',
    custId: ''
  }
  constructor(
    public route: ActivatedRoute,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public shared: ShareddataService,
    public router : Router
  ) {
    debugger
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.id != null) {
      var dat: { [k: string]: any } = {};
      dat.itemId = this.id;
      dat.companyId = this.shared.companyData.companyId;
      this.httpClient.post(this.config.url + 'itemmaster/getItemById',dat).subscribe((data: any) => {
        if (data.status == true) {
          this.formData = data.result[0];
          this.shared.presentSuccessToast(data.message);
        } else {
          this.shared.presentDangerToast(data.message);
        }
      })
    }
  }

  ngOnInit() {
  }


  updateItem() {
    this.shared.presentLoading();
    // this.formData.custId = this.shared.customerData.custId;
    this.httpClient.post(this.config.url + 'itemmaster/updateItemMaster', this.formData).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.itemMastersData = data.result;
        this.shared.presentSuccessToast("Item Added Successfully..!");
        this.router.navigateByUrl('/itemmaster');
      } else {
        this.shared.presentDangerToast(data.message);
      }
    })
  }
}
