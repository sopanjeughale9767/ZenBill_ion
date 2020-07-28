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
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';
var UpdateitemmasteritemPage = /** @class */ (function () {
    function UpdateitemmasteritemPage(route, httpClient, config, shared, router) {
        var _this = this;
        this.route = route;
        this.httpClient = httpClient;
        this.config = config;
        this.shared = shared;
        this.router = router;
        this.formData = {
            itemName: '',
            hsnCode: '',
            itemPrice: '',
            unit: '',
            gst: '',
            custId: ''
        };
        debugger;
        this.id = parseInt(this.route.snapshot.paramMap.get('id'));
        if (this.id != null) {
            var dat = {};
            dat.itemId = this.id;
            dat.companyId = this.shared.companyData.companyId;
            this.httpClient.post(this.config.url + 'itemmaster/getItemById', dat).subscribe(function (data) {
                if (data.status == true) {
                    _this.formData = data.result[0];
                    _this.shared.presentSuccessToast(data.message);
                }
                else {
                    _this.shared.presentDangerToast(data.message);
                }
            });
        }
    }
    UpdateitemmasteritemPage.prototype.ngOnInit = function () {
    };
    UpdateitemmasteritemPage.prototype.updateItem = function () {
        var _this = this;
        this.shared.presentLoading();
        // this.formData.custId = this.shared.customerData.custId;
        this.httpClient.post(this.config.url + 'itemmaster/updateItemMaster', this.formData).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.itemMastersData = data.result;
                _this.shared.presentSuccessToast("Item Added Successfully..!");
                _this.router.navigateByUrl('/itemmaster');
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    UpdateitemmasteritemPage = __decorate([
        Component({
            selector: 'app-updateitemmasteritem',
            templateUrl: './updateitemmasteritem.page.html',
            styleUrls: ['./updateitemmasteritem.page.scss'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            HttpClient,
            ConfigProvider,
            ShareddataService,
            Router])
    ], UpdateitemmasteritemPage);
    return UpdateitemmasteritemPage;
}());
export { UpdateitemmasteritemPage };
//# sourceMappingURL=updateitemmasteritem.page.js.map