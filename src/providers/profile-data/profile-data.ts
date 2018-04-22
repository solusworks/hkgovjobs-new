import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class ProfileDataProvider {

  public userProfile: firebase.database.Reference;
  public currentUser: firebase.User;
  public profilePicture: firebase.storage.Reference;
  public userRooms: firebase.database.Reference;
  public messages: firebase.database.Reference;
  public pubRooms: firebase.database.Reference;
  public pubItemList: firebase.database.Reference;
  public itemList: firebase.database.Reference;
  public groupRoom: firebase.database.Reference;
  public groupChatInvi: firebase.database.Reference;
  public userContactP: firebase.database.Reference;
  public userContacts: firebase.database.Reference;

  constructor() {

    this.profilePicture = firebase.storage().ref('profilePicture');
    this.messages = firebase.database().ref('/message');
    this.pubItemList = firebase.database().ref('/pubItem');
    // this.currentUser = firebase.auth().currentUser;
    // this.itemList = firebase.database().ref(`/userProfile/${this.currentUser.uid}/itemList`);
    //   this.userRooms = firebase.database().ref(`/userProfile/${this.currentUser.uid}/rooms`);
    this.pubRooms = firebase.database().ref('/publicRoom');
    // this.userContactP = firebase.database().ref(`/userProfile/${this.currentUser.uid}/contactsPadd/`);
    // this.userContacts = firebase.database().ref(`/userProfile/${this.currentUser.uid}/contacts/`);
    // this.groupRoom = firebase.database().ref(`/userProfile/${this.currentUser.uid}/groupChat`);
    // this.groupChatInvi = firebase.database().ref(`/userProfile/${this.currentUser.uid}/groupChatInvitation`);
    this.userProfile = firebase.database().ref('/userProfile');

  }

  getUserProfile(): firebase.database.Reference {
    return this.userProfile.child(firebase.auth().currentUser.uid);
  }

  getAllUserProfile(): firebase.database.Reference {
    return this.userProfile;
  }

  getUserRooms(): firebase.database.Reference {
    return this.userRooms;
  }

  getPubRooms(): firebase.database.Reference {
    return this.pubRooms;
  }

  getUserContactP(): firebase.database.Reference {
    return this.userContactP;
  }

  getUserContacts(): firebase.database.Reference {
    return this.userContacts;
  }
  //get pub items
  getPubItems(): firebase.database.Reference {
    return this.pubItemList;
  }
  //get your items
  getItemList(): firebase.database.Reference {
    return this.itemList;
  }

  //get group chat invitaion
  getGroupInvi(): firebase.database.Reference {
    return this.groupChatInvi;
  }
  //get your group chat list
  getGroupList(): firebase.database.Reference {
    return this.groupRoom;
  }

  //get userid 
  getUserName(userId): PromiseLike<string> {

    return new Promise((resolve) => {

      firebase.database().ref('/userProfile').child(userId).once('value').then((snapshot) => {
        resolve(snapshot.val().firstName);
      })
    });

  }

  //get userid 
  getUserId(): string {
    return this.currentUser.uid;
  }

  removeMessage(room: string, key: any): PromiseLike<any> {
    return this.messages.child(room).child('messageList').child(key).remove()
      .then(function () {
        console.log("Remove succeeded." + key)
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }

  removeContactP(userid: string, key: any): PromiseLike<any> {
    return this.userProfile.child(userid).child('contactsPadd').child(key).remove()
      .then(function () {
        console.log("Remove succeeded." + key)
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }

  removeContacts(userid: string, key: any): PromiseLike<any> {
    return this.userProfile.child(userid).child('contacts').child(key).remove()
      .then(function () {

        console.log("Remove succeeded." + key)
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }

  removeRoom(userid: string, key: any): PromiseLike<any> {
    return this.userProfile.child(userid).child('rooms').child(key).remove()
      .then(function () {

        console.log("Remove succeeded." + key);
      })
      .catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }
  removePub(room: string, key: any): PromiseLike<any> {
    return this.pubRooms.child(room).remove()
      .then(function () {
        console.log("Remove succeeded." + key);
      }).catch(function (error) {
        console.log("Remove failed: " + error.message)
      });
  }


  addContact(userid: any, username: any, id: any, pic: string): PromiseLike<any> {
    return this.userProfile.child(id).child('contacts').push(
      {
        room: userid + id,
        id: userid,
        name: username,
        pic: pic
      }
    );
  }

  addContactSelf(userid: string, name: any, id: string, pic): PromiseLike<any> {
    return this.userProfile.child(userid).child('contacts').push(
      {
        room: userid + id,
        id: id,
        name: name,
        pic: pic
      }
    );
  }

  addContactRoom(userid: string, name: any, id: string): PromiseLike<any> {
    let room: string = userid + id;
    console.log(room);
    return this.userRooms.push({
      name: room,
      pp: name
    });
  }
  //remove group chat
  removeGroup(roomId: string): PromiseLike<any> {
    return this.userProfile.child(this.currentUser.uid).child('groupChat')
      .child(roomId).remove();
  }

  //accept group invite
  addGroupRoom(roomName: string, roomId: string, key): PromiseLike<any> {
    return this.userProfile.child(this.currentUser.uid).child('groupChat').push({
      roomName: roomName,
      roomId: roomId
    }).then((newGroupChat) => {
      this.userProfile.child(this.currentUser.uid).child('groupChatInvitation')
        .child(key).remove();
      console.log("Remove succeeded.");
      return newGroupChat;
    });

  }

  //deny group invite
  denyGroup(key): PromiseLike<any> {
    return this.userProfile.child(this.currentUser.uid).child('groupChatInvitation')
      .child(key).remove();
  }

  //start adding group room
  initGroupRoom(who: string, roomName: string, inviteList: any, pic): PromiseLike<any> {
    return this.userProfile.child(this.currentUser.uid).child('groupChat').push({
      roomName: roomName
    }).then(
      (newRoom) => {
        this.userProfile.child(this.currentUser.uid).child('groupChat').child(newRoom.key).
          child('roomId').set(newRoom.key);
        inviteList.forEach(
          snap => {
            this.userProfile.child(snap.id).child('groupChatInvitation').push({
              roomName: roomName,
              roomId: newRoom.key,
              who: who,
              pic: pic
            });
          }
        );

        return newRoom;
      });
  }

  //group room invite
  groupRoomInvite(who: string, userid: string, room: string): PromiseLike<any> {
    return this.userProfile.child(userid).child('groupRoomInvite').push({
      who: who,
      name: room
    });
  }
  //add contactroom to pp
  addContactRoomTo(userid: string, name: any, id: string): PromiseLike<any> {
    let room: string = userid + id;
    //console.log(room);
    return this.userProfile.child(id).child('rooms').push({
      name: room,
      pp: name
    });
  }

  addContactPadd(userid: string, username: string, myid: string, pic: string): PromiseLike<any> {
    return this.userProfile.child(userid).child('contactsPadd').push(
      {
        id: myid,
        name: username,
        pic: pic
      }
    );
  }

  addRoom(nameRoom: string): PromiseLike<any> {
    return this.userRooms.push({
      name: nameRoom,
      pp: nameRoom
    });
  }

  addPublicRoom(roomName: string): PromiseLike<any> {

    return this.pubRooms.push({
      owner: firebase.auth().currentUser.uid,
      name: roomName,
      time: new Date().getTime(),
      timeNegated: -new Date().getTime()
    });
  }

  updateName(firstName: string, lastName: string): PromiseLike<any> {
    return this.userProfile.child(firebase.auth().currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  updateDOB(birthDate: string): PromiseLike<any> {
    return this.userProfile.child(this.currentUser.uid).update({
      birthDate: birthDate,
    });
  }

  // updateEmail(newEmail: string, password: string): PromiseLike<any> {

  //     var currentUser: firebase.User = firebase.auth().currentUser;

  //     const credential = firebase.auth.EmailAuthProvider
  //         .credential(currentUser.email, password);

  //     return currentUser.reauthenticateWithCredential(credential).then(user => {
  //         currentUser.updateEmail(newEmail).then(user => {
  //             this.userProfile.child(this.currentUser.uid)
  //                 .update({ email: newEmail });
  //         });
  //     });
  // }


  // updatePassword(newPassword: string, oldPassword: string): PromiseLike<any> {
  //   const credential =  firebase.auth.EmailAuthProvider
  //     .credential(this.currentUser.email, oldPassword);

  //   return this.currentUser.reauthenticate(credential).then( user => {
  //     this.currentUser.updatePassword(newPassword).then( user => {
  //       console.log("Password Changed");
  //     }, error => {
  //       console.log(error);
  //     });
  //   });
  // }

  updatePic(pic: any): PromiseLike<any> {
    return this.profilePicture.child(this.currentUser.uid).child('profileP.png')
      .putString(pic, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.userProfile.child(this.currentUser.uid).child('profilePic')
          .set(savedPicture.downloadURL);
      });
  }

}
