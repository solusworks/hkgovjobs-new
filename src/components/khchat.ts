import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { EventDataProvider } from '../providers/event-data/event-data';
import { ProfileDataProvider } from '../providers/profile-data/profile-data';
import { AuthDataProvider } from '../providers/auth-data/auth-data';
import { ChatPage } from '../pages/chat/chat';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';
import * as firebase from 'firebase';
// import { IonicPage } from 'ionic-angular/navigation/ionic-page';

var config = {
  apiKey: "AIzaSyDJUOYC3n5HEHTX6nnwjfMab9i5sVpanIE",
  authDomain: "hkgovjobs-b7220.firebaseapp.com",
  databaseURL: "https://hkgovjobs-b7220.firebaseio.com",
  projectId: "hkgovjobs-b7220",
  storageBucket: "hkgovjobs-b7220.appspot.com",
  messagingSenderId: "682224764031"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged((user) => {
  console.log('onAuthStateChanged is called');
});

@IonicPage()
@Component({
  selector: 'khchat',
  templateUrl: 'khchat.html'
})
export class KhchatComponent {

  public pubList: any[];

  constructor(public navCtrl: NavController,
    public eventData: EventDataProvider,
    public profileData: ProfileDataProvider,
    public authData: AuthDataProvider,
    public alertCtrl: AlertController
  ) {

  }

  showProfilePage() {

    if (this.authData.isUserAuthenticated()) {
      this.navCtrl.push(ProfilePage, {});
    } else {
      this.navCtrl.push(LoginPage, {});
    }

  }

  ionViewWillEnter() {

    // ngOnInit() {

    this.profileData.getPubRooms().orderByChild("timeNegated").limitToLast(1000).
      once('value', snapshot => {
        let rawList = [];
        snapshot.forEach(snap => {
          rawList.push({
            key: snap.key,
            name: snap.val().name
          });
          return false;
        });

        this.pubList = rawList;

        console.log(this.pubList);
      });
  }

  showCreateChatPrompt() {

    let alert = this.alertCtrl.create({
      message: "Enter a new topic",
      inputs: [
        {
          name: 'roomName',
          placeholder: '',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {

            if (data.roomName == undefined || data.roomName == "") {

            } else {
              this.profileData.addPublicRoom(data.roomName).then((snapshot) => {
                this.navCtrl.push(ChatPage, { "roomName": data.roomName, "roomId": snapshot.key });
              });
            }

            // this.navCtrl.push(ChatPage, { "roomName": data.roomName });
            // this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });

    alert.present();

  }

  createChat() {

    if (this.authData.isUserAuthenticated()) {
      // this.profileData.addRoom(roomName);
      // this.profileData.addRoomPub(roomName).then(() => {
      //   this.navCtrl.push(ChatPage, { "roomName": roomName });
      // });
      this.showCreateChatPrompt();

      // this.nameRoom = "";
    } else {
      this.navCtrl.push(LoginPage, {});
    }

  }

  openRoom(roomName, roomId) {

    this.navCtrl.push(ChatPage, { "roomName": roomName, "roomId": roomId });
  }

}
