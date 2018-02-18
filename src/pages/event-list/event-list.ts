import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, InfiniteScroll } from 'ionic-angular';
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
  //finished: boolean = false;
  //items: String[] = [];
  //num = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private eventService: EventProvider) {
  }

  ionViewDidEnter() {
    this.getEvents();
  }

  refreshItems(refresher: Refresher) {
    this.getEvents();
    refresher.complete();
  }

  newEvent() {
    this.navCtrl.push('NewEventPage');
  }
  
  getEvents() {
    this.eventService.getEvents().subscribe( res => {
      this.events = res;
    });
  }

  showDetails(event) {
    this.navCtrl.push('EventDetailPage', event);
  }

  /*loadMoreItems(infinite: InfiniteScroll) {
    // Simulating an external service call with a timeout

    let max = this.num + 15; 
    for(;this.num < max; this.num++) {
      this.items.push("Item " + this.num); 
    }
    if(this.num >= 60) { // We'll load a maximum of 60 items this.finished = true;
    }
    if(infinite != null) { infinite.complete(); // Hide the loader
    }

  }*/

}
