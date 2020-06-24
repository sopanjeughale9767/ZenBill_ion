import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData = {
    mobileNumber: null,
    password: null
  }

  errorMessage = '';
  isShow = 1;

  constructor(
    public httpClient: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public platform: Platform,
    public shared: ShareddataService,
    public config: ConfigProvider,
  ) { }

  ngOnInit() {
  }

  login() {
    debugger
    this.shared.presentLoading();
    this.errorMessage = '';
    this.httpClient.post(this.config.url + 'login/login', this.formData).subscribe((data: any) => {
      this.shared.hideLoading();
      if (data.status) {
        debugger 

        localStorage.setItem('companyData', JSON.stringify(data.result));
        this.shared.IsCompanyGstCheck();
    //     this.shared.companyData=data.result;
    // this.shared.isLoginHidden=false;
    //     this.shared.presentSuccessToast(data.message);
        this.navCtrl.navigateRoot('/home1');
    //   }else {
    //     this.shared.presentDangerToast(data.message);
    //   }
    // });
    }else {
          this.shared.presentDangerToast("INVALID LOGIN CREDENTIALS");
        }
  
  })
  }



  show() {
    this.isShow = 0;
  }
  hide() {
    this.isShow = 1;
  }
}
