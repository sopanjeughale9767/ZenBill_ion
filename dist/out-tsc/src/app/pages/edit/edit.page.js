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
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, Platform, NavController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
var EditPage = /** @class */ (function () {
    function EditPage(config, httpClient, shared, camera, filePath, actionSheetController, platform, navCtrl) {
        var _this = this;
        this.config = config;
        this.httpClient = httpClient;
        this.shared = shared;
        this.camera = camera;
        this.filePath = filePath;
        this.actionSheetController = actionSheetController;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.formData = {
            logo: '',
            companyName: '',
            companyAddress: '',
            companyPostalCode: '',
            companyEmail: '',
            companyStateName: '',
            companyGstNo: '',
            pancard: '',
            custMobile: '',
            password: '',
            deliveryTerms: ''
        };
        this.show = false;
        debugger;
        this.httpClient.get(this.config.url + 'company/getCompany/' + this.shared.companyData.companyId).subscribe(function (data) {
            if (data.status) {
                _this.formData = data.result[0];
            }
            else {
                _this.shared.presentDangerToast(data.message);
            }
        });
    }
    EditPage.prototype.ngOnInit = function () {
    };
    EditPage.prototype.isShow = function () {
        this.show = true;
    };
    EditPage.prototype.notShow = function () {
        this.show = false;
    };
    EditPage.prototype.register = function () {
        var _this = this;
        this.shared.presentLoading();
        debugger;
        this.formData.logo = this.logo;
        // if (this.logo == null) {
        //   this.shared.presentToast('Select logo.');
        //   this.shared.hideLoading();
        // } else {
        this.httpClient.post(this.config.url + 'company/update', this.formData).subscribe(function (data) {
            _this.shared.hideLoading();
            if (data.status == true) {
                debugger;
                localStorage.setItem('companyId', data.result.companyId);
                _this.shared.companyDetails(data.result);
                _this.shared.isLoginHidden = true;
                _this.navCtrl.navigateRoot('/home1');
                _this.shared.presentSuccessToast(data.message);
            }
            if (data.success == 0) {
                // this.errorMessage = data.message;
                _this.shared.presentDangerToast(data.message);
            }
        });
    };
    EditPage.prototype.selectImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: "Select Image source",
                            buttons: [{
                                    text: 'Load from Library',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                },
                                {
                                    text: 'Use Camera',
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EditPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        this.camera.getPicture(options).then(function (imagePath) {
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    _this.logo = 'data:image/jpeg;base64,' + correctPath;
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.logo = 'data:image/jpeg;base64,' + correctPath;
                // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
        });
    };
    EditPage = __decorate([
        Component({
            selector: 'app-edit',
            templateUrl: './edit.page.html',
            styleUrls: ['./edit.page.scss'],
        }),
        __metadata("design:paramtypes", [ConfigProvider,
            HttpClient,
            ShareddataService,
            Camera,
            FilePath,
            ActionSheetController,
            Platform,
            NavController])
    ], EditPage);
    return EditPage;
}());
export { EditPage };
//# sourceMappingURL=edit.page.js.map