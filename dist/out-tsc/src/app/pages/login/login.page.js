var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
var LoginPage = /** @class */ (function () {
    function LoginPage(httpClient, modalCtrl, navCtrl, platform, shared, config) {
        this.httpClient = httpClient;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.shared = shared;
        this.config = config;
        this.formData = {
            mobileNumber: null,
            password: null
        };
        this.errorMessage = '';
        this.isShow = 1;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.shared.presentLoading();
        this.errorMessage = '';
        this.httpClient.post(this.config.url + 'company/login', this.formData).subscribe(function (data) {
            _this.shared.hideLoading();
            if (data.status) {
                debugger;
                localStorage.setItem('companyData', JSON.stringify(data.results));
                _this.shared.IsCompanyGstCheck();
                //     this.shared.companyData=data.result;
                // this.shared.isLoginHidden=false;
                //     this.shared.presentSuccessToast(data.message);
                _this.navCtrl.navigateRoot('/home1');
                //   }else {
                //     this.shared.presentDangerToast(data.message);
                //   }
                // });
            }
            else {
                _this.shared.presentDangerToast("INVALID LOGIN CREDENTIALS");
            }
        });
    };
    LoginPage.prototype.show = function () {
        this.isShow = 0;
    };
    LoginPage.prototype.hide = function () {
        this.isShow = 1;
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ModalController,
            NavController,
            Platform,
            ShareddataService,
            ConfigProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map