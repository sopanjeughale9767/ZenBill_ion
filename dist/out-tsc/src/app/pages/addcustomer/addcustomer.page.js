var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddcustomermodalComponent } from 'src/app/components/addcustomermodal/addcustomermodal.component';
var AddcustomerPage = /** @class */ (function () {
    function AddcustomerPage(httpClient, config, shared, router, modalController) {
        this.httpClient = httpClient;
        this.config = config;
        this.shared = shared;
        this.router = router;
        this.modalController = modalController;
    }
    AddcustomerPage.prototype.ngOnInit = function () {
        this.shared.showCard = false;
        this.shared.itemData = [];
    };
    AddcustomerPage.prototype.getCustomer = function (ev) {
        var _this = this;
        var val = ev.target.value;
        if (val.replace(/\s/g, "").length < 1) {
            var dat = {};
            dat.custid = localStorage.getItem('custId');
            ;
            dat.companyId = this.shared.companyData.companyId;
            this.httpClient.post(this.config.url + 'customer/getAll', dat).subscribe(function (data) {
                _this.customers = data.result;
            });
        }
        else {
            this.shared.presentLoading();
            this.httpClient.get(this.config.url + 'customer/searchCustomer/' + val.toString()).subscribe(function (data) {
                if (data != null) {
                    _this.isItemAvailable = true;
                    _this.customers = data.result;
                }
                else {
                    _this.isItemAvailable = false;
                    _this.shared.presentDangerToast(data.message);
                }
            });
        }
    };
    AddcustomerPage.prototype.getCustomerDetails = function (custId) {
        var _this = this;
        debugger;
        var dat = {};
        dat.custid = custId;
        dat.companyId = this.shared.companyData.companyId;
        this.httpClient.post(this.config.url + 'customer/getCustomer', dat).subscribe(function (data) {
            if (data.status == true) {
                _this.shared.customerData = data.result[0];
                _this.customers = data.result[0];
                localStorage.setItem('custGst', data.result[0].custGstNumber);
                localStorage.setItem('custId', data.result[0].custId);
                _this.showCard = true;
                _this.isItemAvailable = false;
                _this.shared.presentSuccessToast(data.message);
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    AddcustomerPage.prototype.addCustomerModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: AddcustomermodalComponent
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddcustomerPage = __decorate([
        Component({
            selector: 'app-addcustomer',
            templateUrl: './addcustomer.page.html',
            styleUrls: ['./addcustomer.page.scss'],
        }),
        __metadata("design:paramtypes", [HttpClient,
            ConfigProvider,
            ShareddataService,
            Router,
            ModalController])
    ], AddcustomerPage);
    return AddcustomerPage;
}());
export { AddcustomerPage };
//# sourceMappingURL=addcustomer.page.js.map