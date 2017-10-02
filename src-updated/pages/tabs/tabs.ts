import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
  
import { FavListPage } from '../../pages/fav-list/fav-list';
 
import { ListPage } from '../../pages/list/list';

@Component({ 
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tab1Root: any = ListPage;
  tab2Root: any = FavListPage;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }
 
}
