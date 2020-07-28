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
import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from '../providers/config/config';
import { Router } from '@angular/router';
var ShareddataService = /** @class */ (function () {
    function ShareddataService(loading, storage, toastController, alertController, httpClient, config, actionSheetController, platform, router) {
        this.loading = loading;
        this.storage = storage;
        this.toastController = toastController;
        this.alertController = alertController;
        this.httpClient = httpClient;
        this.config = config;
        this.actionSheetController = actionSheetController;
        this.platform = platform;
        this.router = router;
        this.currentOpenedModel = null;
        // public companyData: { [c: string]: any } = {};
        this.invoiceData = {};
        this.customerData = {};
        this.invoiceItems = new Array;
        this.isLoginHidden = true;
        this.customers = new Array;
        this.searchItem = new Array;
        this.showCard = false;
        this.itemData = new Array;
        this.itemMastersData = new Array;
        this.IsSubscibed = 0;
        this.selectedFooterPage = "HomePage";
        this.isSearch = false;
        this.isGSTCompany = false;
        this.isSelectGST = false;
        this.searchItems = [];
        this.companyData = {
            companyName: '',
            companyEmail: '',
            companyGstNo: '',
            companyId: 0,
            companyAddress: '',
            deliveryTerms: '',
            custMobile: '',
            pancard: '',
            phNo: '',
            deliveryNote: ''
        };
        this.formData = {
            itemId: null,
            hsnCode: null,
            itemName: null,
            quantity: null,
            rate: null,
            unit: null,
            gst: null,
            discount: 0
        };
        this.isRouteByInvoice = false;
        this.IsCompanyGstCheck();
    }
    ShareddataService.prototype.presentLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            message: 'Loading',
                            spinner: 'bubbles',
                            duration: 2000
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShareddataService.prototype.presentLoadingWithtxt = function (txt) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loading.create({
                            message: txt,
                            spinner: 'bubbles',
                            duration: 2000
                        })];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShareddataService.prototype.hideLoading = function () {
        this.loading.dismiss().catch(function () { });
    };
    ShareddataService.prototype.IsCompanyGstCheck = function () {
        try {
            if (localStorage.getItem('companyData') != null) {
                this.companyData = JSON.parse(localStorage.getItem('companyData'));
                (this.companyData.companyGstNo != '') ? this.isGSTCompany = true : this.isGSTCompany = false;
                this.isLoginHidden = false;
            }
            else {
                this.isLoginHidden = true;
                this.router.navigate(['/login']);
            }
        }
        catch (ex) {
            this.logOut();
        }
    };
    ShareddataService.prototype.getItemsData = function () {
        var _this = this;
        this.presentLoading();
        var dat = {};
        dat.companyId = this.companyData.companyId;
        this.httpClient.post(this.config.url + 'itemMaster/getAll', dat).subscribe(function (data) {
            if (data.status == true) {
                // this.isItemAvailable = true;
                _this.searchItems = data.result;
                _this.presentSuccessToast(data.message);
            }
            else {
                _this.router.navigateByUrl('/additem');
            }
        });
    };
    ShareddataService.prototype.companyDetails = function (data) {
        this.companyData = data;
        console.log(this.companyData);
        localStorage.setItem('companyData', JSON.stringify(this.companyData));
        localStorage.setItem('companyGstNo', this.companyData.companyGstNo);
        localStorage.setItem('companyId', '' + this.companyData.companyId);
        this.IsCompanyGstCheck();
        // this.subscribePush();
    };
    ShareddataService.prototype.logOut = function () {
        this.isLoginHidden = true;
        localStorage.removeItem('companyData');
        this.router.navigateByUrl('/login');
        // this.fb.logout();
    };
    ShareddataService.prototype.presentToast = function (txt) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: txt,
                            duration: 2000,
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShareddataService.prototype.presentSuccessToast = function (txt) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: txt,
                            duration: 2000,
                            color: 'success'
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShareddataService.prototype.presentDangerToast = function (txt) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: txt,
                            duration: 2000,
                            color: "danger"
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    ShareddataService.prototype.presentAlert = function (tx, txt) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: tx,
                            message: txt,
                            buttons: ['OK']
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
    ShareddataService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [LoadingController,
            Storage,
            ToastController,
            AlertController,
            HttpClient,
            ConfigProvider,
            ActionSheetController,
            Platform,
            Router])
    ], ShareddataService);
    return ShareddataService;
}());
export { ShareddataService };
//# sourceMappingURL=shareddata.service.js.map