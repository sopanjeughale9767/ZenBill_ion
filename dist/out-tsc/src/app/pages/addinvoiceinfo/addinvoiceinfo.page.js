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
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ConfigService } from 'src/app/provider/config.service';
var AddinvoiceinfoPage = /** @class */ (function () {
    function AddinvoiceinfoPage(shared, httpClient, config, router, datepipe) {
        // debugger
        this.shared = shared;
        this.httpClient = httpClient;
        this.config = config;
        this.router = router;
        this.datepipe = datepipe;
        this.formData = {
            companyId: this.shared.companyData.companyId,
            invoiceNumber: '',
            invoiceDate: '',
            custId: null,
            deliveryTerms: '',
            deliveryNote: '',
            paymentMode: '',
            supplierRef: '',
            otherRef: '',
            items: [],
            byersOrderNumber: '',
            byersDate: '',
            despatchThrough: '',
            destination: '',
            declaration: '',
            totalSgstAmount: 0,
            totalCgstAmount: 0,
            totalIgstAmount: 0,
            note: ''
        };
        this.isStart = true;
    }
    AddinvoiceinfoPage.prototype.ngOnInit = function () {
    };
    AddinvoiceinfoPage.prototype.onChange = function (paymentMode) {
        var _this = this;
        debugger;
        var dat = {};
        dat.companyId = this.shared.companyData.companyId;
        dat.paymentMode = paymentMode;
        this.config.postHttp('invoice/getInvoiceById/0', dat).then(function (result) {
            _this.shared.invoiceNumber = _this.formData.invoiceNumber = (result.result[0].invoiceNumber + 1);
            if (_this.shared.invoiceNumber == 1) {
                _this.isStart = false;
            }
            // this.formData.invoiceDate = this.datepipe.transform(new Date(), 'dd-mm-yyyy');
        });
    };
    AddinvoiceinfoPage.prototype.saveInvoice = function () {
        var _this = this;
        debugger;
        //
        if (this.shared.isSelectGST) {
            debugger;
            if (this.shared.customerData.custGstNumber.substring(0, 2) == this.shared.companyData.companyGstNo.substring(0, 2)) {
                this.shared.itemData.forEach(function (element) {
                    element.cgst = element.gst / 2;
                    element.sgst = element.gst / 2;
                    element.igst = 0;
                });
            }
            else {
                this.shared.itemData.forEach(function (element) {
                    element.cgst = 0;
                    element.sgst = 0;
                    element.igst = element.gst;
                });
            }
        }
        this.shared.presentLoading();
        this.formData.items = this.shared.itemData;
        this.formData.custId = this.shared.customerData.custId;
        debugger;
        this.httpClient.post(this.config.url + 'invoice/saveInvoice', this.formData).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.invoiceData = data.result[0];
                _this.shared.presentSuccessToast(data.message);
                _this.templateNumber = localStorage.getItem('number');
                if (parseInt(_this.templateNumber) == 1) {
                    _this.router.navigateByUrl("/template1");
                }
                else {
                    if (parseInt(_this.templateNumber) == 2) {
                        _this.router.navigateByUrl("/template2");
                    }
                    else {
                        if (parseInt(_this.templateNumber) == 3) {
                            _this.router.navigateByUrl("/template3");
                        }
                        else {
                            if (parseInt(_this.templateNumber) == 4) {
                                _this.router.navigateByUrl("/home");
                            }
                            else {
                                _this.router.navigateByUrl("/home");
                            }
                        }
                    }
                }
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    AddinvoiceinfoPage = __decorate([
        Component({
            selector: 'app-addinvoiceinfo',
            templateUrl: './addinvoiceinfo.page.html',
            styleUrls: ['./addinvoiceinfo.page.scss'],
        }),
        __metadata("design:paramtypes", [ShareddataService,
            HttpClient,
            ConfigService,
            Router,
            DatePipe])
    ], AddinvoiceinfoPage);
    return AddinvoiceinfoPage;
}());
export { AddinvoiceinfoPage };
//# sourceMappingURL=addinvoiceinfo.page.js.map