import { Component, OnInit } from '@angular/core';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-itemmaster',
  templateUrl: './itemmaster.page.html',
  styleUrls: ['./itemmaster.page.scss'],
})
export class ItemmasterPage implements OnInit {
  itemMastersData: any;
  gst: string;
  isIntra: boolean = true;

  constructor(
    public shared: ShareddataService,
    public config: ConfigProvider,
    public httpClient: HttpClient
  ) {
    this.getItemMasterData();
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.getItemMasterData();
  };
  
  getItemMasterData() {
    var dat: { [k: string]: any } = {};
    dat.custid=this.shared.customerData.custid;
    dat.companyId=this.shared.companyData.companyId;
    this.httpClient.post(this.config.url + 'itemmaster/getAll',dat).subscribe((data: any) => {
      if (data.status == true) {
        this.shared.itemMastersData = data.result;
        this.shared.presentSuccessToast(data.message);
      }else{
        this.shared.presentDangerToast(data.message);
      }
    })
  }

  deleteItem(key) {
    debugger
    this.httpClient.delete(this.config.url + 'itemmaster/deleteItemMaster/' + key).subscribe((data: any) => {
      if (data != null) {
        this.shared.presentSuccessToast(data.message);
        this.getItemMasterData();
      } else {
        this.shared.presentDangerToast(data.message);
      }
    });
  }

}
