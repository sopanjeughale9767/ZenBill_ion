import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigProvider } from 'src/app/providers/config/config';
import { ShareddataService } from 'src/app/services/shareddata.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, Platform, NavController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  formData = {
    logo: '',
    companyName:'',
    companyAddress:'',
    companyPostalCode:'',
    companyEmail:'',
    companyStateName:'',
    companyGstNo:'',
    pancard:'',
    custMobile:'',
    password:'',
    deliveryTerms:''
  };
  logo: string;
  show: boolean=false;
  constructor(
    public config : ConfigProvider,
    public httpClient : HttpClient,
    public shared : ShareddataService,
    public camera : Camera,
    private filePath: FilePath,
    public actionSheetController : ActionSheetController,
    public platform : Platform,
    public navCtrl : NavController
  ) { 
    debugger
this.httpClient.get(this.config.url + 'company/getCompany/'+this.shared.companyData.companyId).subscribe((res:any)=>{
   
this.formData=res.data[0];
 
})
  }

  ngOnInit() {
  }
  isShow(){
    this.show = true;
  }

  notShow(){
    this.show = false;
  }
  update() {
    this.shared.presentLoading();
      this.formData.logo = this.logo;
      // if (this.logo == null) {
      //   this.shared.presentToast('Select logo.');
      //   this.shared.hideLoading();
      // } else {
            this.httpClient.post(this.config.url + 'company/update', this.formData).subscribe((res: any) => {
            this.shared.hideLoading();
            if (res.status == true) {
              localStorage.setItem('companyId',res.data.companyId);
              this.shared.companyDetails(res.result);
              this.shared.isLoginHidden=true;
              this.navCtrl.navigateRoot('/home1');
              this.shared.presentSuccessToast(res.message);
            }
            if (res.success == 0) {
              this.shared.presentDangerToast(res.message);
            }
          });
      
    
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


takePicture(sourceType: PictureSourceType) {
  var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
  };

  this.camera.getPicture(options).then(imagePath => {
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
          this.filePath.resolveNativePath(imagePath)
              .then(filePath => {
                  let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                  let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                  // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                  this.logo= 'data:image/jpeg;base64,' + correctPath;
              });
      } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          this.logo= 'data:image/jpeg;base64,' + correctPath;

          // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
  });
}
}
