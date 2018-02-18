import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IEvent } from '../../models/event';
import { EventProvider } from '../../providers/events/events';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';

/**
 * Generated class for the NewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-event',
  templateUrl: 'new-event.html',
})
export class NewEventPage {
  event: IEvent = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera,
              private eventService: EventProvider, private alertCtrl: AlertController,
              private actionSheetCtrl: ActionSheetController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewEventPage');
  }

  create() {
    this.eventService.addEvent(this.event).subscribe( 
      res => {
        this.navCtrl.pop();
        this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Event created successfully',
          buttons: [
            {
              text: 'OK'
            }
          ]
        })
      },
      error => this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: [
          {
            text: 'OK'
          }
        ]
      })

    )
  }

  changePosition(pos: google.maps.LatLng) { 
    this.event.lat = pos.lat();
    this.event.lng = pos.lng();
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
      this.event.image = 'data:image/jpeg;base64,' + imageData;
    }).catch( error => {
      
    });
  }

}
