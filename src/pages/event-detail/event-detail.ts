import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../models/event';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event: IEvent;
  eventInfo = 'EventInfoPage';
  eventLocation = 'EventLocationPage';
  eventAttend = 'EventAttendPage';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = navParams.data;
  }
  
}
