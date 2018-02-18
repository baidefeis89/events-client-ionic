import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTa_i6W9Hse6NcxF3IUUQjCFHWSdtut6A'
    })
  ],
})
export class ProfilePageModule {}
