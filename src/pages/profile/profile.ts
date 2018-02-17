import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/users/users';
import { IUser } from '../../models/user';
import { isNumber } from 'ionic-angular/util/util';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: IUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserProvider) {
    
  }

  ionViewWillLoad() {
    console.log('willLoad');
    let id = isNumber(this.navParams.data) ? this.navParams.data : null;

    this.userService.getUser(id).subscribe( res => {
      this.user = res;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  showEvents() {
    this.navCtrl.push('EventUserPage', this.user.id);
  }

}
