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
import { ShareddataService } from 'src/app/services/shareddata.service';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ActivatedRoute, Router } from '@angular/router';
var AdditemPage = /** @class */ (function () {
    function AdditemPage(httpClient, shared, config, route, router) {
        this.httpClient = httpClient;
        this.shared = shared;
        this.config = config;
        this.route = route;
        this.router = router;
        this.formData = {
            itemName: '',
            hsnCode: '',
            itemPrice: '',
            unit: '',
            gst: '',
            per: '',
            custId: null,
            companyId: null
        };
    }
    AdditemPage.prototype.ngOnInit = function () {
        this.formData;
    };
    AdditemPage.prototype.addItem = function () {
        var _this = this;
        debugger;
        this.shared.presentLoading();
        this.formData.custId = this.shared.customerData.custId;
        this.formData.companyId = this.shared.companyData.companyId;
        this.httpClient.post(this.config.url + 'itemmaster/addItemMaster', this.formData).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.presentSuccessToast(data.message);
                _this.shared.getItemsData();
                _this.router.navigateByUrl('/searchitem');
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    AdditemPage = __decorate([
        Component({
            selector: 'app-additem',
            templateUrl: './additem.page.html',
            styleUrls: ['./additem.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ShareddataService,
            ConfigProvider,
            ActivatedRoute,
            Router])
    ], AdditemPage);
    return AdditemPage;
}());
export { AdditemPage };
//# sourceMappingURL=additem.page.js.map