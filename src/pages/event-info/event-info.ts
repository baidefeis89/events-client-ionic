import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../models/event';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { EventProvider } from '../../providers/events/events';

/**
 * Generated class for the EventInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-info',
  templateUrl: 'event-info.html',
})
export class EventInfoPage {
  event: IEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private alertCtrl: AlertController, private eventService: EventProvider) {
    this.event = navParams.data;
  }

  deleteEvent() {
    let confirm = this.alertCtrl.create({
      title: 'Delete this event?',
      message: 'Are you sure you want to permanently delete this event?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Delete',
          handler: () => this.remove()
        }
      ]
    });
    confirm.present();
  }

  remove() {
    console.log('Agree clicked');
    this.eventService.deleteEvent(this.event.id).subscribe( 
      res => this.alertCtrl.create({
        title: 'Delete',
        message: 'Event has been deleted',
        buttons: [
          {
            text: 'OK'
          }
        ]
      }).present(),
      error => this.alertCtrl.create({
        title: 'Error',
        message: error,
        buttons: [
          {
            text: 'OK'
          }
        ]
      }).present(),
      () => this.navCtrl.parent.parent.pop()
    )

  }
  
}
