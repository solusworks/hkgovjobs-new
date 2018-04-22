import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';
  
 import { LocalStorage } from '../../providers/local-storage'; 
 import { CommonFunction } from '../../providers/common-function'; 

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})

export class PopoverPage {
  isFav : boolean = false;
  constructor(public viewCtrl: ViewController, public commonFunction: CommonFunction, public localStorage: LocalStorage, public navCtrl: NavController, public navParams: NavParams) {
     
  }

  ionViewWillEnter(){
    
    // console.log( this.navParams.data );
    console.log( this.navParams.data.jobid );


    this.chekAlreadyFav();

  } 

  close() {
    this.viewCtrl.dismiss();
  } 

  favUnfav(isFavAlready){
  
    //set
    var favArr  = [];

    var allFavIds = this.localStorage.getObject('favJobIds' , '[]' )
    console.log(allFavIds);
    favArr = allFavIds;

     this.close();

    if( isFavAlready ){
     let index = favArr.indexOf(  this.navParams.data.jobid );
     if( index > -1 ){
        favArr.splice(index, 1); // remove fav
     }
     this.isFav = false;

    //  this.commonFunction.presentToast('Removed from favourites');

    }else{
    
      let currentId = this.navParams.data.jobid;
       favArr.push( currentId  );
      this.isFav = true;
      //  this.commonFunction.presentToast('Added to favourites');
    }  
    this.localStorage.setObject('favJobIds', favArr );
       console.log( this.localStorage.getObject('favJobIds' , '[]' ) );  
  }

  chekAlreadyFav(){
    let allFavIds = this.localStorage.getObject('favJobIds' , '[]'  );
    
    for( let i = 0; i < allFavIds.length ; i++){ 
      if( allFavIds[i] == this.navParams.data.jobid ){
        this.isFav = true;
      }
    }
  }

}