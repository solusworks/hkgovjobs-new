import { Component,ViewChild } from '@angular/core';

import { NavController, NavParams,Events, Tabs } from 'ionic-angular';
  
import { FavListPage } from '../../pages/fav-list/fav-list';
 
import { ListPage } from '../../pages/list/list';

@Component({ 
  templateUrl: 'tabs.html'
})

export class TabsPage {
	@ViewChild('myTabs') tabRef: Tabs;
  tab1Root: any = ListPage;
  tab2Root: any = FavListPage;
 
  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams) {
     this.events.subscribe('tab:defaultSelection', ( time ) => { 
      console.log('tab:defaultSelection');
       this.selectJobListOnly();
    });
  }

  selectJobListOnly() {
   this.tabRef.select(0);
 }
 
}
