import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewEventPage } from './new-event';
import { AgmCoreModule } from '@agm/core';
import { GmapsAutocompleteDirective } from '../../providers/gmaps-autocomplete.directive';

@NgModule({
  declarations: [
    NewEventPage,
    GmapsAutocompleteDirective
  ],
  imports: [
    IonicPageModule.forChild(NewEventPage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTa_i6W9Hse6NcxF3IUUQjCFHWSdtut6A',
      libraries: ['places']
    })
  ],
})
export class NewEventPageModule {}
