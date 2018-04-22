import { NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileDataProvider } from '../../providers/profile-data/profile-data';
import { AuthDataProvider } from '../../providers/auth-data/auth-data';
// import { HomePage } from '../home/home';
// import { KhchatComponent as HomePage } from '../../components/khchat/khchat';
import { KhchatComponent as HomePage } from '../../components/khchat';
import { LoginPage } from '../login/login';
// import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;
  public userP: any;
  public profileP: any;

  constructor(public navCtrl: NavController, public profileData: ProfileDataProvider,
    public authData: AuthDataProvider, public alertCtrl: AlertController) {
  }

  ionViewWillLoad() {
    //console.log(this.profileData.getUserId());
      this.profileData.getUserProfile().on('value', (data) => {
        this.userProfile = data.val();
        this.birthDate = this.userProfile.birthDate;
        this.userP = this.userProfile.profilePic;
      });

  }

  logOut() {
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  // takePicture() {
  //   this.camera.getPicture({
  //     quality: 95,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
  //     allowEdit: true,
  //     encodingType: this.camera.EncodingType.PNG,
  //     targetWidth: 100,
  //     targetHeight: 100,
  //     saveToPhotoAlbum: true
  //   }).then(imageData => {
  //     this.profileP = imageData;
  //     imageData = null;

  //   }, error => {
  //     console.log("ERROR -> " + JSON.stringify(error));
  //   });
  // }

  updateP() {
    this.profileData.updatePic(this.profileP);
  }

  updateName() {
    let alert = this.alertCtrl.create({
      message: "Enter your username",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Username',
          value: this.userProfile.firstName
        },
        // {
        //   name: 'lastName',
        //   placeholder: 'Your last name',
        //   value: this.userProfile.lastName
        // },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {

            if(data.firstName == undefined || data.firstName.length == 0) {

            } else {
              this.profileData.updateName(data.firstName, '');
            }
            
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate) {
    this.profileData.updateDOB(birthDate);
  }

  // updateEmail() {
  //   let alert = this.alertCtrl.create({
  //     inputs: [
  //       {
  //         name: 'newEmail',
  //         placeholder: 'Your new email',
  //       },
  //       {
  //         name: 'password',
  //         placeholder: 'Your password',
  //         type: 'password'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.profileData.updateEmail(data.newEmail, data.password);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // updatePassword() {
  //   let alert = this.alertCtrl.create({
  //     inputs: [
  //       {
  //         name: 'newPassword',
  //         placeholder: 'Your new password',
  //         type: 'password'
  //       },
  //       {
  //         name: 'oldPassword',
  //         placeholder: 'Your old password',
  //         type: 'password'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.profileData.updatePassword(data.newPassword, data.oldPassword);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
}