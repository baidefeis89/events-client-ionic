import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../models/event';
import { EventProvider } from '../../providers/events/events';

/**
 * Generated class for the EventUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-user',
  templateUrl: 'event-user.html',
})
export class EventUserPage {
  eventsFrom: IEvent[] = [];
  eventsAttend: IEvent[] = [];
  showEvents: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventProvider) {
    let idUser = this.navParams.data;
    this.eventService.getEventsFromUser(idUser).subscribe( res => {
      this.eventsFrom = res;
    });
    this.eventService.getEventsUserAttend(idUser).subscribe( res => {
      this.eventsAttend = res;
    });

    this.showEvents = 'created';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventUserPage');
  }

}
