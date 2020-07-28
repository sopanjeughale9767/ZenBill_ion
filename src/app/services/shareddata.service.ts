import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, ActionSheetController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from '../providers/config/config';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ShareddataService {
  currentOpenedModel: any = null;
  // public companyData: { [c: string]: any } = {};
  public invoiceData: { [i: string]: any } = {};
  public customerData: { [r: string]: any } = {};
  public invoiceItems = new Array;
public isLoginHidden=true;
  public customers = new Array;
  searchItem = new Array;
  showCard: boolean = false;
  itemData = new Array;
  itemMastersData = new Array;
  IsSubscibed = 0;
  public selectedFooterPage = "HomePage";
  invoiceNumber: any;
  isSearch: boolean = false;
  isGSTCompany = false;
  isSelectGST = false;
  searchItems=[];
  companyData={
    companyName:''
  ,companyEmail:''
  ,companyGstNo:''
  ,companyId:0
  ,companyAddress:''
  ,deliveryTerms:''
  ,custMobile:''
  ,pancard:''
,phNo:''
,deliveryNote:''
  };
  formData = {
    itemId:null,
    hsnCode: null,
    itemName: null,
    quantity: null,
    rate: null,
    unit: null,
    gst: null,
    discount: 0

  }


  customerFormData = {
    custId: null,
    custName: '',
    custAddress: '',
    custGstNumber: '',
    custStateName: '',
    custCode: '',
    companyId:'',
    custMobile:''
  }


isRouteByInvoice=false;
  constructor(
    public loading: LoadingController,
    public storage: Storage,
    public toastController: ToastController,
    public alertController: AlertController,
    public httpClient: HttpClient,
    public config: ConfigProvider,
    public actionSheetController: ActionSheetController,
    public platform: Platform,
    public router: Router
  ) {
    this.IsCompanyGstCheck();
  }




  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Loading',
      spinner: 'bubbles',
      duration: 2000
    });
    await loading.present();
  }

  async presentLoadingWithtxt(txt) {
    const loading = await this.loading.create({
      message: txt,
      spinner: 'bubbles',
      duration: 2000
    });
    await loading.present();
  }

  hideLoading() {
    this.loading.dismiss().catch(() => { });
  }
  IsCompanyGstCheck() { 
    try{
    if (localStorage.getItem('companyData') != null) {
       
      this.companyData = JSON.parse(localStorage.getItem('companyData'));
      (this.companyData.companyGstNo != '') ? this.isGSTCompany = true : this.isGSTCompany = false;
      this.isLoginHidden=false;
    } else {
      this.isLoginHidden=true;

      this.router.navigate(['/login']);
    }
  }catch(ex){
    this.logOut();
  }

  }
  getItemsData(){
    this.presentLoading();
    var dat: { [k: string]: any } = {};
    dat.companyId=this.companyData.companyId;
    this.httpClient.post(this.config.url + 'itemMaster/getAll',dat).subscribe((data: any) => {

      if (data.status == true) {
        // this.isItemAvailable = true;
        this.searchItems = data.result;
        this.presentSuccessToast(data.message);
      } else {
        this.router.navigateByUrl('/additem');
      }
    });
  }
  companyDetails(data) {
     
    this.companyData = data;

    console.log(this.companyData);
    localStorage.setItem('companyData', JSON.stringify(this.companyData));

    localStorage.setItem('companyGstNo', this.companyData.companyGstNo);
    localStorage.setItem('companyId', ''+this.companyData.companyId);
    this.IsCompanyGstCheck();
    // this.subscribePush();
  }
  logOut() {
    this.isLoginHidden=true;
    localStorage.removeItem('companyData');
    this.router.navigateByUrl('/login');
    // this.fb.logout();
  }


  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,

    });
    toast.present();
  }

  async presentSuccessToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentDangerToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000,
      color: "danger"
    });
    toast.present();
  }

  async presentAlert(tx, txt) {
    const alert = await this.alertController.create({
      header: tx,
      message: txt,
      buttons: ['OK']
    });

    await alert.present();
  }
}
