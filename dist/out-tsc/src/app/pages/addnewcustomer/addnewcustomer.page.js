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
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
var AddnewcustomerPage = /** @class */ (function () {
    function AddnewcustomerPage(shared, config, httpClient, router) {
        this.shared = shared;
        this.config = config;
        this.httpClient = httpClient;
        this.router = router;
        this.isItemAvailable = false;
        this.formData = {
            custName: '',
            custAddress: '',
            custGstNumber: '',
            custStateName: '',
            custCode: '',
            companyId: '',
            custMobile: ''
        };
        this.isShow = false;
    }
    AddnewcustomerPage.prototype.ngOnInit = function () {
    };
    AddnewcustomerPage.prototype.add = function () {
        var _this = this;
        debugger;
        this.shared.presentLoading();
        this.formData.companyId = '' + this.shared.companyData.companyId;
        this.httpClient.post(this.config.url + 'customer/addCustomer', this.formData).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.customerData = data.result[0];
                _this.shared.presentSuccessToast(data.message);
                _this.router.navigateByUrl('/addcustomer');
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    AddnewcustomerPage = __decorate([
        Component({
            selector: 'app-addnewcustomer',
            templateUrl: './addnewcustomer.page.html',
            styleUrls: ['./addnewcustomer.page.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            ConfigProvider,
            HttpClient,
            Router])
    ], AddnewcustomerPage);
    return AddnewcustomerPage;
}());
export { AddnewcustomerPage };
//# sourceMappingURL=addnewcustomer.page.js.map