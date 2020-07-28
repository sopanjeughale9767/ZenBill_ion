var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigProvider } from './providers/config/config';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ShareddataService } from './services/shareddata.service';
import { Network } from '@ionic-native/network/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PopoverComponent } from './components/popover/popover.component';
import { AddcustomermodalComponent } from './components/addcustomermodal/addcustomermodal.component';
import { ConfigService } from './provider/config.service';
import { HTTP } from '@ionic-native/http/ngx';
import { InvoiceComponent } from './invoices/invoice/invoice.component';
import { NumberToWordsPipe } from './pipes/num-to-word.pipe';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent,
                AddcustomermodalComponent,
                InvoiceComponent,
                PopoverComponent],
            entryComponents: [PopoverComponent, AddcustomermodalComponent],
            imports: [
                BrowserModule,
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot(),
                AppRoutingModule,
                HttpClientModule,
            ],
            providers: [
                StatusBar,
                SplashScreen,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                HttpClient,
                ShareddataService,
                ConfigProvider,
                DatePipe,
                NumberToWordsPipe,
                Network,
                FilePath,
                Camera,
                FileOpener,
                File,
                SocialSharing,
                DecimalPipe,
                ConfigService,
                HTTP
            ],
            bootstrap: [AppComponent],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map