import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/users/users';
import { IUser } from '../../models/user';
import { isNumber } from 'ionic-angular/util/util';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private userService: UserProvider, private modalCtrl: ModalController, 
              private alertCtrl: AlertController) {
    
  }

  ionViewWillLoad() {
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

  editPassword() {
    let modal = this.modalCtrl.create('EditProfilePage', { field: 'pass'})
    modal.onDidDismiss(data => {
      if(data.changed) this.showAlert('Success','Password has been updated');
      else if (data.error) this.showAlert('Error', data.error);
    });
    modal.present();
  }

  editUser() {
    let modal = this.modalCtrl.create('EditProfilePage', { field: 'mail', user: {email: this.user.email, name: this.user.name}});
    modal.onDidDismiss(data => {
      if(data.changed) this.showAlert('Success','User info has been updated');
      else if (data.error) this.showAlert('Error', data.error);
    });
    modal.present();
  }

  editAvatar() {
    let modal = this.modalCtrl.create('EditProfilePage', { field: 'avatar'})
    modal.onDidDismiss(data => {
      if(data.changed) {
        this.showAlert('Success','Avatar has been updated');
      }
      else if (data.error) this.showAlert('Error', data.error);
    });
    modal.present();
  }

  showAlert(title:string, subtitle: string) {
    this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [
        {
          text: 'OK'
        }
      ]
    }).present();
  }



}
