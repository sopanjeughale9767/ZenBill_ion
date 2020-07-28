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
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
var AddcustomermodalComponent = /** @class */ (function () {
    function AddcustomermodalComponent(shared, config, httpClient, router, modalCtrl) {
        this.shared = shared;
        this.config = config;
        this.httpClient = httpClient;
        this.router = router;
        this.modalCtrl = modalCtrl;
        this.isItemAvailable = false;
        this.data = {
            custName: '',
            custMobile: '',
            custAddress: '',
            custGstNumber: '',
            custStateName: '',
            custCode: '',
        };
        this.isShow = false;
    }
    AddcustomermodalComponent.prototype.ngOnInit = function () {
    };
    AddcustomermodalComponent.prototype.add = function () {
        var _this = this;
        debugger;
        this.shared.presentLoading();
        this.httpClient.post(this.config.url + 'customer/addCustomer', this.data).subscribe(function (data) {
            if (data.status == true) {
                _this.dismiss();
                _this.shared.presentSuccessToast('Success');
            }
            else {
                _this.shared.presentDangerToast('Failed..');
            }
        });
    };
    AddcustomermodalComponent.prototype.dismiss = function () {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    };
    AddcustomermodalComponent = __decorate([
        Component({
            selector: 'app-addcustomermodal',
            templateUrl: './addcustomermodal.component.html',
            styleUrls: ['./addcustomermodal.component.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            ConfigProvider,
            HttpClient,
            Router,
            ModalController])
    ], AddcustomermodalComponent);
    return AddcustomermodalComponent;
}());
export { AddcustomermodalComponent };
//# sourceMappingURL=addcustomermodal.component.js.map