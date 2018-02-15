import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  cameraImage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private camera: Camera, private actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select image from',
      buttons: [
        {
          text: 'Camera',
          icon: 'ios-camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Album',
          icon: 'md-images',
          handler: () => {
            this.pickPhoto();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.getPicture(options);
    
  }

  pickPhoto() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 640,
      targetHeight: 640,
      destinationType: this.camera.DestinationType.DATA_URL 
    }

    this.getPicture(options);
  }

  private getPicture(options: CameraOptions) {
    this.camera.getPicture(options).then((imageData) => {
      this.cameraImage = 'data:image/jpeg;base64,' + imageData;
      }).catch( error => {
        
      });
  }

}
