import { Component, ViewChild, QueryList, OnDestroy } from '@angular/core';

import { Platform, NavController, IonRouterOutlet, AlertController, ActionSheetController, PopoverController, MenuController, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ConfigProvider } from './providers/config/config';
import { Router } from '@angular/router';
import { ShareddataService } from './services/shareddata.service';
import { Network } from '@ionic-native/network/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  backButtonSubscription;
  @ViewChild(IonRouterOutlet, { read: IonRouterOutlet }) routerOutlets: QueryList<IonRouterOutlet>;
  public appPages = [
    {
      title: 'Home',
      url: '/home1',
      icon: 'home'
    },
    {
      title: 'Item Master',
      url: '/itemmaster',
      icon: 'add'
    },
    {
      title: 'Templates',
      icon: 'clipboard',
      children: [
        {
          title: 'Template1',
          url: '/template1',
          icon: 'clipboard'


        },
        {
          title: 'Template2',
          url: '/template2',
          icon: 'done-all'
        },
        {
          title: 'Template3',
          url: '/template3',
          icon: 'done-all'
        },
        {
          title: 'Template4',
          url: '/home',
          icon: 'done-all'
        }
      ]
    },
    // {
    //   title: 'Invoices',
    //   url: '/invoice',
    //   icon: 'clipboard',
     
    // },
 
  ];
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  cid: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public shared: ShareddataService,
    public navCtrl: NavController,
    public config: ConfigProvider,
    public router: Router,
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public network: Network,
    public translate: TranslateService,
  ) {
    
    //check internate connection
        let connectedToInternet = true;
        network.onDisconnect().subscribe(() => {
          connectedToInternet = false;
          translate.get(["Oopes...", "Disconnected"]).subscribe((res) => {
            this.shared.presentAlert(res["Please Connect to the Internet"], res["Disconnected"]);
          });
          //  console.log('network was disconnected :-(');
          
        });
    
        network.onConnect().subscribe(() => {
          if (!connectedToInternet) {
            window.location.reload();
            //this.loading.show();
            //console.log('network connected!');
            translate.get(["Yeah..", "Connected"]).subscribe((res) => {
              this.shared.presentAlert(res["Network connected Reloading Data"] + '...', res["Connected"]);
            });
            
          }
          //connectSubscription.unsubscribe();
        });
        
        this.initializeApp();
// this.cid = localStorage.getItem('companyId');
        // this.shared.httpClient.get(this.config.url + 'company/getCompany/'+ parseInt(this.cid)).subscribe((data:any)=>{
        //   this.shared.companyData=data;
        // })
  }
  changeCompany(){
    localStorage.setItem('companyData', null);
    this.router.navigateByUrl('/register');
  }

  editCompany(){
    this.router.navigateByUrl('/edit');
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.backButtonEvent();
      // this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#3B3D4A');
      this.splashScreen.hide();
    });
  }

  logout() {
    this.shared.logOut();
    localStorage.setItem('companyData', null);
    // localStorage.removeItem('activationStatus');
    // localStorage.removeItem('pid');
   
    this.navCtrl.navigateForward('/login');
  }
  goToEditProgile() {
    this.navCtrl.navigateForward('/profiledetails');
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      if (this.router.url === '/login') {
        navigator['app'].exitApp();
    
      }else{

      if (this.router.isActive('/home', true) && this.router.url === '/home') {
        const alert = await this.alertController.create({
          header: 'Close app?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            }, {
              text: 'Close',
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });

        await alert.present();
      } else {
        this.navCtrl.navigateRoot('/home');
      }
    }
    });

  }

  // backButtonEvent() {
  //   alert('in event');
  //   this.platform.backButton.subscribeWithPriority(0, () => {
  //     // this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
  //     //   alert('in outlet');
  //     //   // if (outlet && outlet.canGoBack()) {
  //     //     //   alert('in cangoback');
  //     //     //   outlet.pop();
  //     //     // }
  //     //     if (this.router.url != '/home') {
  //     //       alert('in home');

  //     //     await this.router.navigate(['/home']);
  //     //   } else if (this.router.url === '/home') {
  //     //     if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
  //     //       this.lastTimeBackPress = new Date().getTime();
  //     //       this.presentAlertConfirm();
  //     //     } else {
  //     //       navigator['app'].exitApp();
  //     //     }
  //     //   }


  //     // });
  //   });
  // }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    });

    await alert.present();
  }


  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.backButtonSubscription.unsubscribe();
  }
}
