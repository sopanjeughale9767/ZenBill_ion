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
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { Router } from '@angular/router';
var SearchcustomerPage = /** @class */ (function () {
    function SearchcustomerPage(shared, httpClient, config, router) {
        this.shared = shared;
        this.httpClient = httpClient;
        this.config = config;
        this.router = router;
        this.isItemAvailable = false;
    }
    SearchcustomerPage.prototype.ngOnInit = function () {
        var _this = this;
        this.shared.presentLoading();
        var dat = {};
        // dat.custid = localStorage.getItem('custId');;
        dat.companyId = this.shared.companyData.companyId;
        dat.isSelectGST = this.shared.isSelectGST;
        this.httpClient.post(this.config.url + 'customer/getAll/', dat).subscribe(function (data) {
            if (data.status == true) {
                _this.isItemAvailable = true;
                _this.customers = data.result;
                _this.shared.presentSuccessToast(data.message);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    SearchcustomerPage.prototype.getCustomer = function (ev) {
        var _this = this;
        var val = ev.target.value;
        if (val.replace(/\s/g, "").length < 1) {
            var dat = {};
            // dat.custid = localStorage.getItem('custId');;
            dat.companyId = this.shared.companyData.companyId;
            dat.isSelectGST = this.shared.isSelectGST;
            if (dat.companyId == null)
                this.router.navigateByUrl('/addnewcustomer'); // if data not load from localstorage of companyData then redirect to unother page
            this.httpClient.post(this.config.url + 'customer/getAll', dat).subscribe(function (data) {
                _this.customers = data.result;
                if (data.status == true) {
                }
                else {
                    _this.router.navigateByUrl('/addnewcustomer');
                }
            });
        }
        else {
            // this.shared.presentLoading();
            var dat = {};
            dat.key = val.toString();
            dat.companyId = this.shared.companyData.companyId;
            dat.isSelectGST = this.shared.isSelectGST;
            this.httpClient.post(this.config.url + 'customer/searchCustomer', dat).subscribe(function (data) {
                if (data.status == true) {
                    _this.isItemAvailable = true;
                    _this.customers = data.result;
                    console.log(data);
                }
                else {
                    _this.isItemAvailable = false;
                    // this.shared.presentDangerToast("data.message");
                }
            });
        }
    };
    SearchcustomerPage.prototype.getCustomerDetails = function (custId) {
        var _this = this;
        var dat = {};
        dat.custId = custId;
        dat.companyId = this.shared.companyData.companyId;
        dat.isSelectGST = this.shared.isSelectGST;
        this.httpClient.post(this.config.url + 'customer/getCustomer', dat).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.customerData = data.result[0];
                if (_this.shared.isRouteByInvoice)
                    _this.router.navigateByUrl('/invoice');
                else
                    _this.router.navigateByUrl('/addcustomer');
                // this.shared.presentSuccessToast(data.message);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    SearchcustomerPage = __decorate([
        Component({
            selector: 'app-searchcustomer',
            templateUrl: './searchcustomer.page.html',
            styleUrls: ['./searchcustomer.page.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            HttpClient,
            ConfigProvider,
            Router])
    ], SearchcustomerPage);
    return SearchcustomerPage;
}());
export { SearchcustomerPage };
//# sourceMappingURL=searchcustomer.page.js.map