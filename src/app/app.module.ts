import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { AgmCoreModule } from '@agm/core';

//Native plugins
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

//Services
import { AuthProvider } from '../providers/auth/auth';
import { AuthInterceptor } from '../interceptors/auth-token-interceptor.service';
import { EventProvider } from '../providers/events/events';
import { UserProvider } from '../providers/users/users';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCTa_i6W9Hse6NcxF3IUUQjCFHWSdtut6A'
    })*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    Camera,
    Geolocation,
    AuthProvider,
    EventProvider,
    GooglePlus,
    Facebook,
    UserProvider
  ]
})
export class AppModule {}
