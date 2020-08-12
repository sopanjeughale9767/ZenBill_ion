import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';

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


  passwordShown: boolean = false;
  passwordType: string = "password";
  eye: boolean = false;

  constructor(
    public httpClient: HttpClient,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public platform: Platform,
    public shared: ShareddataService,
    public config: ConfigProvider,
    public router: Router
  ) { }

  ngOnInit() {
  }

   
 togglePassword() {
  if (this.passwordShown) {
    this.passwordShown = false;
    this.passwordType = 'password';
    this.eye = false;
  }
  else
   {
    this.passwordShown = true;
    this.passwordType = 'text';
    this.eye = true;
  }
}

register(){
  this.router.navigateByUrl("/register");
}

forgotPassword(){
  alert("comming soon");
}
  login() {
    // this.shared.presentLoading();
    this.errorMessage = '';
    this.httpClient.post(this.config.url + 'company/login', this.formData).subscribe((res: any) => {
      // this.shared.hideLoading();
      if (res.status == true) {
        localStorage.setItem('companyData', JSON.stringify(res.data[0]));
        this.shared.IsCompanyGstCheck();
        //  this.shared.companyData=data.result;
        // this.shared.isLoginHidden=false;
        this.shared.presentSuccessToast(res.message);
        this.navCtrl.navigateRoot('/home1');
      }
       else {
        this.shared.presentDangerToast(res.message);
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
