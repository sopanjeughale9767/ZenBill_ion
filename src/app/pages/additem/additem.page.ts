import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.page.html',
  styleUrls: ['./additem.page.scss'],
})
export class AdditemPage implements OnInit {
  formData = {
    itemName: '',
    hsnCode: '',
    itemPrice: '',
    unit: '',
    gst: '',
    per:'',
    custId:null,
    companyId:null

  }
  constructor(
    public httpClient: HttpClient,
    public shared: ShareddataService,
    public config: ConfigProvider,
    public route : ActivatedRoute,
    public router : Router
  ) { 

  }

  ngOnInit() { 
this.formData;
  }

  addItem() {
    debugger
    this.shared.presentLoading();
    this.formData.custId = this.shared.customerData.custId;
    this.formData.companyId =this.shared.companyData.companyId;
    this.httpClient.post(this.config.url + 'itemmaster/addItemMaster', this.formData).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.presentSuccessToast(data.message);
        this.shared.getItemsData();
        this.router.navigateByUrl('/searchitem');
      } else {
        this.shared.presentDangerToast(data.message);
      }
    })
  }


}
