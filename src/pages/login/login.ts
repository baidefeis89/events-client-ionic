import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Storage } from '@ionic/storage';

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
  user: IUser = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
              private auth: AuthProvider, private alertCtrl: AlertController, private gplus: GooglePlus,
              private fb: Facebook, private storage: Storage) {
  }

  ionViewDidLoad() {
    /*this.gplus.trySilentLogin({'webClientId': '857932202469-b2655f7p4gettk5ovv9e4v6qg3jiipqm.apps.googleusercontent.com'})
      .then(res => { 
        this.response = res;
        //this.isLogged = true; 
      })
      .catch(err => console.error(err));*/
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
      response => {
        this.navCtrl.setRoot('EventListPage');
        this.navCtrl.popToRoot();
      },
      error => this.alertCtrl.create({
        title: 'Error',
        subTitle: error,
        buttons: ['OK']
      }).present()
    );
  }

  loginGoogle() {
    this.gplus.login({}).then( res => {
      this.storage.set('token', res.accessToken).then( res => {
        this.auth.loginGoogle().subscribe( 
          response => {
            this.navCtrl.setRoot('EventListPage');
            this.navCtrl.popToRoot();
          },
          error => this.alertCtrl.create({
            title: 'Error',
            subTitle: error,
            buttons: ['OK']
          }).present()
        );
        
      }).catch( error => {
        this.alertCtrl.create({
          title: 'Error',
          subTitle: error,
          buttons: ['OK']
        }).present()
      })
    });
    /*this.gplus.login({'webClientId': '146629828506-606m42cd6f9v22fs8dc8n1dmalp6l1d1.apps.googleusercontent.com'})
      .then( res => {
        this.response = res;
        this.auth.loginGoogle().subscribe( 
          response => this.alertCtrl.create({
            title: 'Connected',
            subTitle: response,
            buttons: ['OK']
          }).present(),
          error => this.alertCtrl.create({
            title: 'Error',
            subTitle: error,
            buttons: ['OK']
          }).present()
        );
        
      }).catch( error => {
        console.log(error);
        this.response = error;
      })*/
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'email']).then( (resp: FacebookLoginResponse) => {
      if (resp.status === 'connected')
        this.storage.set('token', resp.authResponse.accessToken).then( res => {
          this.auth.loginFacebook().subscribe( 
            response => {
              this.navCtrl.setRoot('EventListPage');
              this.navCtrl.popToRoot();
            },        
            error => this.alertCtrl.create({
              title: 'Error',
              subTitle: error,
              buttons: ['OK']
            }).present()
          );
        })
    }).catch( error => {
      console.log('Error:',error);
    })
  }

}
