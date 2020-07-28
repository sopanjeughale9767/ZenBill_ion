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
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { Router } from '@angular/router';
var SearchitemPage = /** @class */ (function () {
    function SearchitemPage(httpClient, shared, config, router) {
        this.httpClient = httpClient;
        this.shared = shared;
        this.config = config;
        this.router = router;
        // searchItems: any;
        // isItemAvailable: boolean=false;
        this.formData = {};
        debugger;
        this.shared.getItemsData();
    }
    SearchitemPage.prototype.ngOnInit = function () {
        debugger;
    };
    SearchitemPage.prototype.ngOnDestroy = function () {
    };
    SearchitemPage.prototype.onSearchChange = function (ev) {
        var _this = this;
        debugger;
        var val = ev.target.value;
        if (val.replace(/\s/g, "").length < 1) {
            var dat = {};
            dat.key = val.toString();
            dat.companyId = this.shared.companyData.companyId;
            this.httpClient.post(this.config.url + 'itemMaster/getAll', dat).subscribe(function (data) {
                if (data.status == true) {
                    _this.shared.searchItems = data.result;
                    // this.isItemAvailable = true;
                    _this.shared.presentSuccessToast("Success..");
                }
                else {
                    _this.shared.presentDangerToast("Failed..");
                }
            });
        }
        else {
            this.shared.presentLoading();
            var dat = {};
            dat.key = val.toString();
            dat.companyId = this.shared.companyData.companyId;
            this.httpClient.post(this.config.url + 'itemMaster/searchItemMaster', dat).subscribe(function (data) {
                if (data.status == true) {
                    // this.isItemAvailable = true;
                    _this.shared.presentSuccessToast(data.message);
                    _this.shared.searchItems = data.result;
                }
                else {
                    // this.isItemAvailable = false;
                    _this.shared.presentDangerToast(data.message);
                }
            });
        }
    };
    SearchitemPage.prototype.getItemDetails = function (item) {
        this.shared.formData = item;
        this.shared.isSearch = true;
        this.router.navigateByUrl('/addproduct');
        // this.shared.presentLoading();
        // var dat: { [k: string]: any } = {};
        // dat.itemId = itemId;
        // dat.companyId = this.shared.companyData.companyId;
        // this.httpClient.post(this.config.url + 'itemMaster/getItemById',dat).subscribe((data: any) => {
        //   if (data.status == true) {
        //     this.shared.formData = data.result[0];
        //     // this.shared.customerData = data.result[0];
        //     console.log(this.shared.customerData);
        //     this.shared.isSearch = true;
        //     // this.isItemAvailable = false;
        //     this.ngOnDestroy();
        //     this.router.navigateByUrl('/addproduct');
        //     this.shared.presentSuccessToast(data.message);
        //   } else {
        //     this.shared.presentDangerToast(data.message);
        //   }
        // })
    };
    SearchitemPage = __decorate([
        Component({
            selector: 'app-searchitem',
            templateUrl: './searchitem.page.html',
            styleUrls: ['./searchitem.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ShareddataService,
            ConfigProvider,
            Router])
    ], SearchitemPage);
    return SearchitemPage;
}());
export { SearchitemPage };
//# sourceMappingURL=searchitem.page.js.map