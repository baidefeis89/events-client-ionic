import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { AuthProvider } from '../../providers/auth/auth';
import { IUser } from '../../models/user';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  position: {
    lat: number,
    lng: number
  };
  user: IUser = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
              private auth: AuthProvider, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillLoad() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.user.lat = resp.coords.latitude;
      this.user.lng = resp.coords.longitude;
    }).catch((error) => {
       console.log('Error getting location', error);
    });
  }

  goRegister() {
    this.navCtrl.push('RegisterPage');
  }

  login() {
    this.auth.login(this.user).subscribe( 
      response => console.log('logeado'),
      error => this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['OK']
      }).present()
    );
  }

}
