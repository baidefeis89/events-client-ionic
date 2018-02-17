import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../models/event';
import { EventProvider } from '../../providers/events/events';

/**
 * Generated class for the EventAttendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-attend',
  templateUrl: 'event-attend.html',
})
export class EventAttendPage {
  event: IEvent;
  users: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventProvider) {
    this.event = navParams.data;
    eventService.getAttend(this.event.id).subscribe( res => {
      this.users = res;
    });
  }

}
