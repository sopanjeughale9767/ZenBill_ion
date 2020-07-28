var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Platform, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
// import { Md5 } from 'ts-md5/dist/md5';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { ShareddataService } from '../services/shareddata.service';
// tslint:disable-next-line: triple-equals
if (localStorage.langId == undefined) {
    localStorage.langId = '1'; // default language id
    localStorage.languageCode = 'en'; // default language code
    localStorage.direction = 'ltr'; // default language direction of app
    localStorage.currency = '₹'; // default currecny html code to show in app.
    // Please visit this link to get your html code  https://html-css-js.com/html/character-codes/currency/
    localStorage.currencyCode = 'RS'; // default currency code
    localStorage.currencyPos = 'left'; // default currency position
    localStorage.decimals = 2; // default currecny decimal
}
var ConfigService = /** @class */ (function () {
    function ConfigService(storage, platform, 
    // public md5: Md5,
    // public localNotifications: LocalNotifications,
    http, events, shared, httpNative) {
        // this.consumerKey = Md5.hashStr(this.consumerKey).toString();
        // this.consumerSecret = Md5.hashStr(this.consumerSecret).toString();
        this.storage = storage;
        this.platform = platform;
        this.http = http;
        this.events = events;
        this.shared = shared;
        this.httpNative = httpNative;
        // public yourSiteUrl = 'https://offersindia.in/offersindia';
        this.consumerKey = 'faacc10715566968714dafcf37';
        this.consumerSecret = '0b17d38b15566968718f34b934';
        //visual studio
        // public yourSiteUrl: string = 'http://localhost:3001';
        this.yourSiteUrl = 'http://45.132.242.104:3001';
        this.url = this.yourSiteUrl + '/api/';
        this.imgUrl = this.yourSiteUrl + "/";
        this.loader = 'dots';
        this.langId = localStorage.langId;
        this.onesignalSenderId = '';
        this.appSettings = {};
    }
    ConfigService.prototype.getHttp = function (req) {
        var _this = this;
        var d = new Date();
        var httpOptions = {
            headers: new HttpHeaders({
                'consumer-key': this.consumerKey,
                'consumer-secret': this.consumerSecret,
                'consumer-nonce': d.getTime().toString(),
                'consumer-device-id': 'device id of the app',
                'consumer-ip': '192.168.1.11',
            })
        };
        var nativeHeaders = {
            'consumer-key': this.consumerKey,
            'consumer-secret': this.consumerSecret,
            'consumer-nonce': d.getTime().toString(),
            'consumer-device-id': 'device id of the app',
            'consumer-ip': '192.168.1.11',
            'Content-Type': 'application/json',
        };
        return new Promise(function (resolve) {
            if (_this.platform.is('cordova')) {
                _this.httpNative.get(_this.url + req, {}, nativeHeaders)
                    .then(function (data) {
                    var d = JSON.parse(data.data);
                    //this.storeHttpData(request, d);
                    resolve(d);
                    //// console.log(data.status);
                    //// console.log(data.data); // data received by server
                    //// console.log(data.headers);
                })
                    .catch(function (error) {
                    // console.log("Error : " + req);
                    // console.log(error);
                    // console.log(error.error); // error message as string
                    // console.log(error.headers);
                });
            }
            else {
                _this.http.get(_this.url + req, httpOptions).subscribe(function (data) {
                    resolve(data);
                }, function (err) {
                    // console.log("Error : " + req);
                    // console.log(err);
                });
            }
        });
    };
    // this is temprary used by rs
    ConfigService.prototype.postHttp = function (req, data) {
        var _this = this;
        return new Promise(function (resolve) {
            debugger;
            _this.http.post(_this.url + req, data).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                // console.log("Error : " + req);
                // console.log(err);
            });
        });
    };
    ConfigService.prototype.postHttpOriginal = function (req, data) {
        var _this = this;
        var d = new Date();
        var httpOptions = {
            headers: new HttpHeaders({
                'consumer-key': this.consumerKey,
                'consumer-secret': this.consumerSecret,
                'consumer-nonce': d.getTime().toString(),
                'consumer-device-id': 'device id of the app',
                'consumer-ip': '192.168.1.11',
            })
        };
        var nativeHeaders = {
            'Content-Type': 'application/json',
            'consumer-key': this.consumerKey,
            'consumer-secret': this.consumerSecret,
            'consumer-nonce': d.getTime().toString(),
            'consumer-device-id': 'device id of the app',
            'consumer-ip': '192.168.1.11',
        };
        return new Promise(function (resolve) {
            if (_this.platform.is('cordova')) {
                _this.httpNative.setDataSerializer("json");
                _this.httpNative.post(_this.url + req, data, nativeHeaders)
                    .then(function (data) {
                    // console.log(data.data);
                    var d = JSON.parse(data.data);
                    //this.storeHttpData(request, d);
                    resolve(d);
                    //// console.log(data.status);
                    //// console.log(data.data); // data received by server
                    //// console.log(data.headers);
                })
                    .catch(function (error) {
                    // console.log("Error : " + req);
                    // console.log(error);
                    // console.log(error.error); // error message as string
                    // console.log(error.headers);
                });
            }
            else {
                _this.http.post(_this.url + req, data, httpOptions).subscribe(function (data) {
                    resolve(data);
                }, function (err) {
                    // console.log("Error : " + req);
                    // console.log(err);
                });
            }
        });
    };
    ConfigService.prototype.getSettingsFromServer = function () {
        return this.getHttp('sitesetting');
    };
    ConfigService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage,
            Platform,
            HttpClient,
            Events,
            ShareddataService,
            HTTP])
    ], ConfigService);
    return ConfigService;
}());
export { ConfigService };
//# sourceMappingURL=config.service.js.map