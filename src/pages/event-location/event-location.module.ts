import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventLocationPage } from './event-location';

import { AgmCoreModule } from '@agm/core';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

@NgModule({
  declarations: [
    EventLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(EventLocationPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTa_i6W9Hse6NcxF3IUUQjCFHWSdtut6A'
    })
  ],
  providers: [
    LaunchNavigator
  ]
})
export class EventLocationPageModule {}
