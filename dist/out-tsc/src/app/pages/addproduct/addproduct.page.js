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
import { ConfigProvider } from 'src/app/providers/config/config';
import { HttpClient } from '@angular/common/http';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
var AddproductPage = /** @class */ (function () {
    function AddproductPage(config, httpClient, shared, navCtrl, route, router, alertController, alertCtrl) {
        this.config = config;
        this.httpClient = httpClient;
        this.shared = shared;
        this.navCtrl = navCtrl;
        this.route = route;
        this.router = router;
        this.alertController = alertController;
        this.alertCtrl = alertCtrl;
        this.formData = {
            hsnCode: null,
            itemName: null,
            quantity: null,
            rate: null,
            unit: null,
            gst: null,
            discount: 0
        };
        this.isSearch = false;
        this.isItemAvailable = false;
        this.showTable = false;
        this.showButton = false;
        this.invoiceId = this.route.snapshot.paramMap.get('id');
        console.log(this.invoiceId);
    }
    AddproductPage.prototype.ngOnInit = function () {
        this.onSearchChange("");
    };
    AddproductPage.prototype.onSearchChange = function (ev) {
        var _this = this;
        debugger;
        var val = ev.target.value;
        if (val.replace(/\s/g, "").length < 1) {
            var dat = {};
            dat.custid = this.shared.customerData.custid;
            dat.companyId = this.shared.companyData.companyId;
            this.httpClient.post(this.config.url + 'itemMaster/getAll', dat).subscribe(function (data) {
                if (data.status == true) {
                    _this.searchItems = data.result;
                    _this.isItemAvailable = true;
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
            this.httpClient.get(this.config.url + 'itemMaster/searchItemMaster', dat).subscribe(function (data) {
                if (data.status == true) {
                    _this.isItemAvailable = true;
                    _this.shared.presentSuccessToast("Success..");
                    _this.searchItems = data.result;
                }
                else {
                    _this.shared.presentDangerToast("Failed..");
                }
            });
        }
    };
    AddproductPage.prototype.getItemDetails = function (itemId) {
        var _this = this;
        this.shared.presentLoading();
        this.httpClient.get(this.config.url + 'itemMaster/getItemById/' + itemId).subscribe(function (data) {
            if (data.status == true) {
                _this.formData = data.result[0];
                _this.shared.customerData = data.result[0];
                console.log(_this.shared.customerData);
                _this.isSearch = true;
                _this.isItemAvailable = false;
                _this.shared.presentSuccessToast("Success");
            }
            else {
                _this.shared.presentDangerToast("Failed..");
            }
        });
    };
    AddproductPage.prototype.addProduct = function () {
        var _this = this;
        debugger;
        if (this.shared.itemData.filter(function (x) { return x.itemId == _this.shared.formData.itemId; }).length != 0) {
            var index = this.shared.itemData.indexOf(this.shared.formData, 0);
            // delete this.shared.itemData[key];
            if (index > -1) {
                this.shared.itemData.splice(index, 1);
            }
        }
        this.shared.itemData.push(this.shared.formData);
        // console.log(this.shared.itemData);
        this.showTable = true;
        this.showButton = true;
        this.shared.isSearch = false;
        this.shared.formData = {
            itemId: null,
            hsnCode: null,
            itemName: null,
            quantity: null,
            rate: null,
            unit: null,
            gst: null,
            discount: null
        };
    };
    AddproductPage.prototype.removeItem1 = function (key) {
        var index = this.shared.itemData.findIndex(function (i) { return i.itemId === key; });
        this.shared.itemData.splice(index, 1);
    };
    AddproductPage.prototype.removeItem = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm!',
                            message: 'Are you sure you want to permanently delete this product?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        var index = _this.shared.itemData.findIndex(function (i) { return i.itemId === key; });
                                        _this.shared.itemData.splice(index, 1);
                                        console.log('Confirm Okay');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AddproductPage = __decorate([
        Component({
            selector: 'app-addproduct',
            templateUrl: './addproduct.page.html',
            styleUrls: ['./addproduct.page.scss'],
        }),
        __metadata("design:paramtypes", [ConfigProvider,
            HttpClient,
            ShareddataService,
            NavController,
            ActivatedRoute,
            Router,
            AlertController,
            AlertController])
    ], AddproductPage);
    return AddproductPage;
}());
export { AddproductPage };
//# sourceMappingURL=addproduct.page.js.map