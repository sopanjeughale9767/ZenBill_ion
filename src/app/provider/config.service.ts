
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
  localStorage.currency = '₹';  // default currecny html code to show in app.
  // Please visit this link to get your html code  https://html-css-js.com/html/character-codes/currency/
  localStorage.currencyCode = 'RS';  // default currency code
  localStorage.currencyPos = 'left';  // default currency position
  localStorage.decimals = 2;  // default currecny decimal
}

@Injectable()

export class ConfigService {

  // public yourSiteUrl = 'https://offersindia.in/offersindia';
  public consumerKey = 'faacc10715566968714dafcf37';
  public consumerSecret = '0b17d38b15566968718f34b934';

//visual studio
public yourSiteUrl: string = 'http://localhost:3001';
// public yourSiteUrl: string = 'http://45.132.242.104:3001';



public  url: string = this.yourSiteUrl + '/api/';
public imgUrl: string = this.yourSiteUrl + "/";

public loader = 'dots';



  public langId: string = localStorage.langId;
  public onesignalSenderId = '';
  public appSettings: { [k: string]: any } = {};

  constructor(
    public storage: Storage,
    public platform: Platform,
    // public md5: Md5,
    // public localNotifications: LocalNotifications,
    public http: HttpClient,
    public events: Events,
    public shared : ShareddataService,

    private httpNative: HTTP
  ) {
    // this.consumerKey = Md5.hashStr(this.consumerKey).toString();
    // this.consumerSecret = Md5.hashStr(this.consumerSecret).toString();

  }
  getHttp(req) {
    const d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
      'Content-Type': 'application/json',
    };

    return new Promise(resolve => {
      if (this.platform.is('cordova')) {
        this.httpNative.get(this.url + req, {}, nativeHeaders)
          .then(res => {
            let d = JSON.parse(res.data);
            //this.storeHttpData(request, d);
            resolve(d);
            //// console.log(data.status);
            //// console.log(data.data); // data received by server
            //// console.log(data.headers);
          })
          .catch(error => {
            // console.log("Error : " + req);
            // console.log(error);
            // console.log(error.error); // error message as string
            // console.log(error.headers);
          });
      }
      else {
        this.http.get(this.url + req, httpOptions).subscribe((res: any) => {
          resolve(res.data);
        }, (err) => {
          // console.log("Error : " + req);
          // console.log(err);
        });
      }
    });
  }

  // this is temprary used by rs
  postHttp(req, data){
    return new Promise(resolve => {
        this.http.get(this.url + req, data).subscribe((data: any) => {
          resolve(data);
        }, (err) => {
          // console.log("Error : " + req);
          // console.log(err);
        });
    });
  }
  postHttpOriginal(req, data) {
    let d = new Date();
    const httpOptions = {
      headers: new HttpHeaders({
        'consumer-key': this.consumerKey,
        'consumer-secret': this.consumerSecret,
        'consumer-nonce': d.getTime().toString(),
        'consumer-device-id': 'device id of the app',
        'consumer-ip': '192.168.1.11',
      })
    };
    const nativeHeaders = {
      'Content-Type': 'application/json',
      'consumer-key': this.consumerKey,
      'consumer-secret': this.consumerSecret,
      'consumer-nonce': d.getTime().toString(),
      'consumer-device-id': 'device id of the app',
      'consumer-ip': '192.168.1.11',
    };

    return new Promise(resolve => {
      if (this.platform.is('cordova')) {
        this.httpNative.setDataSerializer("json");
        this.httpNative.post(this.url + req, data, nativeHeaders)
          .then(data => {
            // console.log(data.data);
            let d = JSON.parse(data.data);
            //this.storeHttpData(request, d);
            resolve(d);
            //// console.log(data.status);
            //// console.log(data.data); // data received by server
            //// console.log(data.headers);
          })
          .catch(error => {
            // console.log("Error : " + req);
            // console.log(error);
            // console.log(error.error); // error message as string
            // console.log(error.headers);
          });
      }
      else {
        this.http.post(this.url + req, data, httpOptions).subscribe((data: any) => {
          resolve(data);
        }, (err) => {
          // console.log("Error : " + req);
          // console.log(err);
        });
      }
    });
  }
  
 
  
 
  getSettingsFromServer() {
    return this.getHttp('sitesetting');
  }
}