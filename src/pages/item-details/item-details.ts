import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

 import { CommonFunction } from '../../providers/common-function';
 import { LocalStorage } from '../../providers/local-storage'; 

 @Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  item: any;

  constructor( public localStorage: LocalStorage, public commonFunction: CommonFunction, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.item = navParams.get('item'); 

  }

   PrettyPrint(str: string) {
   		// var str1 =  str.toString();
       return ( str ? str.replace(/(?:\r\n|\r|\n)/g, '<br />') : '' );
    }

    FavUnfavStar(){
      let isFavAlready = this.item.star; 

      var favArr  = [];

    var allFavIds = this.localStorage.getObject('favJobIds' , '[]' )
   
    favArr = allFavIds;

     if( isFavAlready ){
     let index = favArr.indexOf(  this.item.jobid );
     if( index > -1 ){
        favArr.splice(index, 1); // remove fav

        this.item.star = false; 
     }
     
    //  this.commonFunction.presentToast('Removed from favourites');

    }else{
    
      let currentId = this.item.jobid;
       favArr.push( currentId  );
       
          this.item.star = true; 

      //  this.commonFunction.presentToast('Added to favourites');
    }  
   
      this.localStorage.setObject('favJobIds', favArr );
    }

}
