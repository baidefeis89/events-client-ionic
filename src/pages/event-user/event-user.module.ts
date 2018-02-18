import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventUserPage } from './event-user';

@NgModule({
  declarations: [
    EventUserPage,
  ],
  imports: [
    IonicPageModule.forChild(EventUserPage),
  ],
})
export class EventUserPageModule {}
