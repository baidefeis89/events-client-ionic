import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/events/events';
import { IEvent } from '../../models/event';

/**
 * Generated class for the EventListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  events: IEvent[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private eventService: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
  }

  ionViewWillLoad() {
    this.eventService.getEvents().subscribe( res => {
      this.events = res;
    });
  }

}
