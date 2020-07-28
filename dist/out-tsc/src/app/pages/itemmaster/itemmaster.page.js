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
var ItemmasterPage = /** @class */ (function () {
    function ItemmasterPage(shared, config, httpClient) {
        this.shared = shared;
        this.config = config;
        this.httpClient = httpClient;
        this.isIntra = true;
        this.getItemMasterData();
    }
    ItemmasterPage.prototype.ngOnInit = function () {
    };
    ItemmasterPage.prototype.ionViewDidEnter = function () {
        this.getItemMasterData();
    };
    ;
    ItemmasterPage.prototype.getItemMasterData = function () {
        var _this = this;
        var dat = {};
        dat.custid = this.shared.customerData.custid;
        dat.companyId = this.shared.companyData.companyId;
        this.httpClient.post(this.config.url + 'itemmaster/getAll', dat).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.itemMastersData = data.result;
                _this.shared.presentSuccessToast(data.message);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    ItemmasterPage.prototype.deleteItem = function (key) {
        var _this = this;
        debugger;
        this.httpClient.delete(this.config.url + 'itemmaster/deleteItemMaster/' + key).subscribe(function (data) {
            if (data != null) {
                _this.shared.presentSuccessToast(data.message);
                _this.getItemMasterData();
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    ItemmasterPage = __decorate([
        Component({
            selector: 'app-itemmaster',
            templateUrl: './itemmaster.page.html',
            styleUrls: ['./itemmaster.page.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            ConfigProvider,
            HttpClient])
    ], ItemmasterPage);
    return ItemmasterPage;
}());
export { ItemmasterPage };
//# sourceMappingURL=itemmaster.page.js.map