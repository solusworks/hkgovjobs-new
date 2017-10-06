import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

 import { CommonFunction } from '../../providers/common-function';

 @Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  item: any;

  constructor( public commonFunction: CommonFunction, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.item = navParams.get('item');

  }

   PrettyPrint(str: string) {
   		// var str1 =  str.toString();
       return ( str ? str.replace(/(?:\r\n|\r|\n)/g, '<br />') : '' );
    }

}
