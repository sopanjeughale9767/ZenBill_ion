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
var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent(shared, httpClient, config, router) {
        this.shared = shared;
        this.httpClient = httpClient;
        this.config = config;
        this.router = router;
        this.isItemAvailable = false;
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.shared.presentLoading();
        var dat = {};
        // dat.custid = localStorage.getItem('custId');;
        debugger;
        dat.companyId = this.shared.companyData.companyId;
        dat.custId = this.shared.customerData.custId;
        this.httpClient.post(this.config.url + 'invoice/getAll', dat).subscribe(function (data) {
            if (data.status == true) {
                _this.isItemAvailable = true;
                _this.invoices = data.result;
                _this.shared.presentSuccessToast(data.message);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    InvoiceComponent.prototype.getInvoice = function (ev) {
        var _this = this;
        var val = ev.target.value;
        {
            // this.shared.presentLoading();
            var dat = {};
            dat.key = val.toString();
            dat.companyId = this.shared.companyData.companyId;
            dat.custId = this.shared.customerData.custId;
            this.httpClient.post(this.config.url + 'invoice/searchInvoice', dat).subscribe(function (data) {
                if (data.status == true) {
                    _this.isItemAvailable = true;
                    _this.invoices = data.result;
                    console.log(data);
                }
                else {
                    _this.isItemAvailable = false;
                    // this.shared.presentDangerToast("data.message");
                }
            });
        }
    };
    InvoiceComponent.prototype.getInvoiceData = function (data) {
        this.shared.invoiceData = data;
        var templateNumber = '';
        templateNumber = '1'; //localStorage.getItem('number');
        if (parseInt(templateNumber) == 1) {
            this.router.navigateByUrl("/template1");
        }
        else {
            if (parseInt(templateNumber) == 2) {
                this.router.navigateByUrl("/template2");
            }
            else {
                if (parseInt(templateNumber) == 3) {
                    this.router.navigateByUrl("/template3");
                }
                else {
                    if (parseInt(templateNumber) == 4) {
                        this.router.navigateByUrl("/home");
                    }
                    else {
                        this.router.navigateByUrl("/home");
                    }
                }
            }
        }
    };
    InvoiceComponent = __decorate([
        Component({
            selector: 'app-invoice',
            templateUrl: './invoice.component.html',
            styleUrls: ['./invoice.component.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            HttpClient,
            ConfigProvider,
            Router])
    ], InvoiceComponent);
    return InvoiceComponent;
}());
export { InvoiceComponent };
//# sourceMappingURL=invoice.component.js.map