import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventDataProvider } from '../../providers/event-data/event-data';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthDataProvider } from '../../providers/auth-data/auth-data';
import * as firebase from 'firebase';
import { ProfileDataProvider } from '../../providers/profile-data/profile-data';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  public userProfile: any;
  public userName: string = "anonymous";
  public guestPicture: any = null;
  public eventList: any;

  public userId: string;
  public pic: string = "";
  public message: any;
  public time: any;
  private startAt: any;
  private loadingSpinner: string;
  private loadingText: string;
  private roomName: string;
  private roomId: string;
  private lastReloadTime: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eventData: EventDataProvider,
    public alertCtrl: AlertController,
    public authData: AuthDataProvider,
    public profileData: ProfileDataProvider
  ) {

    this.roomName = navParams.data['roomName'];
    this.roomId = navParams.data['roomId'];
    this.loadingSpinner = "bubbles";
    this.loadingText = "Loading more data...";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    // alert("this.authData.isUserAuthenticated: " + this.authData.isUserAuthenticated());
    if (this.authData.isUserAuthenticated()) {
      this.userId = firebase.auth().currentUser.uid;

      this.profileData.getUserProfile().on('value', (data) => {
        this.userProfile = data.val();
        this.userName = this.userProfile.firstName;
        // this.birthDate = this.userProfile.birthDate;
        // this.userP = this.userProfile.profilePic;
      });
    }

  }

  shouldLoadMore(infiniteScroll): boolean {

    if (this.lastReloadTime < new Date().getTime() - 1000) {
      this.lastReloadTime = new Date().getTime();
      // alert("true");
      // infiniteScroll.enable(true);

      return true;
    }

    // alert("false");
    // infiniteScroll.enable(false);
    return false;
  }

  loadMoreMessages(infiniteScroll) {

    // if (!this.shouldLoadMore(infiniteScroll)) {
    //   return;
    // }

    // infiniteScroll.enable(false);

    // alert(this.eventList[this.eventList.length-1]['time']);
    // this.isReloading = true;

    this.eventData.getMessageRoom(this.roomId).orderByChild("time").
      startAt(this.eventList[this.eventList.length - 1]['time']).limitToFirst(10).once('value', snapshot => {

        if (snapshot.numChildren() == 1 || snapshot.numChildren() == 0) {
          // alert("end of thread")
          // this.loadingSpinner = "";
          this.loadingText = "End of thread";
          if (infiniteScroll) {
            infiniteScroll.complete();
            // this.isReloading = false;
          }
          return;
        } else {
          this.loadingText = "Loading more data...";
        }

        snapshot.forEach(snap => {

          // skip the anchor item
          if (snap.val() == undefined || snap.val().time == this.eventList[this.eventList.length - 1]['time']) {
            return false;
          }

          this.eventList.push({
            key: snap.key,
            messagePicture: snap.val().messagePicture,
            name: snap.val().name,
            userId: snap.val().userId,
            text: snap.val().text,
            pic: snap.val().pic,
            time: snap.val().time,
            timeNegated: snap.val().timeNegated
          });
          return false;
        });

        if (infiniteScroll) {
          infiniteScroll.complete();
          // this.isReloading = false;
        }

      });
    // this.isReloading = false;
  }

  loadInitialMessages() {

    return new Promise((resolve) => {

      this.eventData.getMessageRoom(this.roomId)
        .orderByChild("time").limitToFirst(10).once('value', snapshot => {
          let rawList = [];
          snapshot.forEach(snap => {

            this.profileData.getUserName(snap.val().userId).then((userName) => {

              rawList.push({
                key: snap.key,
                messagePicture: snap.val().messagePicture,
                name: userName,
                userId: snap.val().userId,
                text: snap.val().text,
                pic: snap.val().pic,
                time: snap.val().time
              });

            });

            return false;
          });

          this.eventList = rawList;
          resolve();

        });

    });

  }

  ionViewWillEnter() {
    this.loadInitialMessages();
  }

  // createMessage(userName: string, message: string) {
  createMessage(message: string) {

    if (message == undefined || message.length == 0) {
      return;
    }

    if (this.userId == undefined || this.userId == null) {
      this.presentLoginAlert();
      return;
    }

    this.time = Date.now();
    this.eventData.createMessage(this.userName, message, this.guestPicture, this.roomId, this.userId, this.pic, this.time).then(() => {
      this.loadInitialMessages();
    });
    // this.userId == undefined ? "" : this.userId
    this.message = " ";

  }

  presentLoginAlert() {
    const alert = this.alertCtrl.create({
      title: '',
      message: 'Please login to leave a message',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Login',
          handler: () => {
            this.navCtrl.push(LoginPage, {});
            // console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
