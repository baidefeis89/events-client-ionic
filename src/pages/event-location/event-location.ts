import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IEvent } from '../../models/event';

import { LaunchNavigator } from '@ionic-native/launch-navigator';

/**
 * Generated class for the EventLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-location',
  templateUrl: 'event-location.html',
})
export class EventLocationPage {
  event: IEvent;

  constructor(public navCtrl: NavController, public navParams: NavParams, private launchNavigator: LaunchNavigator) {
    this.event = navParams.data;
  }

  navigate() {
    //let options: LaunchNavigatorOptions = {};
    this.launchNavigator.navigate([this.event.lat, this.event.lng], {}) .then(ok => console.log("Navigation launched!"));
  }

}
