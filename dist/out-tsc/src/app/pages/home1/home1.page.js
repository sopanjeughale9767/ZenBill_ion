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
import { Router } from '@angular/router';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
var Home1Page = /** @class */ (function () {
    function Home1Page(router, shared, httpClient, config) {
        this.router = router;
        this.shared = shared;
        this.httpClient = httpClient;
        this.config = config;
    }
    Home1Page.prototype.ngOnInit = function () {
    };
    Home1Page.prototype.onCustomer = function (bit) {
        debugger;
        if (bit == 1) {
            if (this.shared.isGSTCompany) {
                this.shared.isSelectGST = true;
                this.router.navigateByUrl('/searchcustomer');
            }
            else {
                this.shared.presentAlert('Warning', 'Please first enter your company GST number in the company profile');
            }
        }
        else {
            this.shared.isSelectGST = false;
            this.router.navigateByUrl('/searchcustomer');
        }
    };
    Home1Page = __decorate([
        Component({
            selector: 'app-home1',
            templateUrl: './home1.page.html',
            styleUrls: ['./home1.page.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            ShareddataService,
            HttpClient,
            ConfigProvider])
    ], Home1Page);
    return Home1Page;
}());
export { Home1Page };
//# sourceMappingURL=home1.page.js.map