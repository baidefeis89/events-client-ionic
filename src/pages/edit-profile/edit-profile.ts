import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { UserProvider } from '../../providers/users/users';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  avatar: string;
  pass = {
    password: '',
    password2: ''
  };
  user = {
    name: '',
    email: ''
  };
  field: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private actionSheetCtrl: ActionSheetController, private camera: Camera,
              private viewCtrl: ViewController, private userService: UserProvider) {
    this.field = this.navParams.get('field');
    if (this.field === 'mail') {
      this.user = this.navParams.get('user');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  cancel() { 
    this.viewCtrl.dismiss({changed: false});
  }

  save() {
    switch(this.field) {
      case 'mail':
        this.userService.editUser(this.user).subscribe( 
          res => this.viewCtrl.dismiss({changed: true}),
          error => this.viewCtrl.dismiss({changed: false, error: error})
        );
      break;
      case 'pass':
      if (this.pass.password !== this.pass.password2) {
        this.viewCtrl.dismiss({changed: false, error: 'Passwords are not equals'});
      }

      this.userService.editPassword(this.pass).subscribe( 
        res => this.viewCtrl.dismiss({changed: true}),
        error => this.viewCtrl.dismiss({changed: false, error: error})
      );
      break;
      case 'avatar':
      this.userService.editAvatar(this.avatar).subscribe( 
        res => this.viewCtrl.dismiss({changed: true}),
        error => this.viewCtrl.dismiss({changed: false, error: error})
      );
      break;
    }
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
      this.avatar = 'data:image/jpeg;base64,' + imageData;
    }).catch( error => {
      
    });
  }

}
