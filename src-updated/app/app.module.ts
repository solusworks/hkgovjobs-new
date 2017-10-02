import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component'; 

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { FavListPage } from '../pages/fav-list/fav-list';
import { PopoverPage } from '../pages/popover/popover';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CommonFunction } from '../providers/common-function'; 
import { LocalStorage } from '../providers/local-storage';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    TabsPage,
    FavListPage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
    tabsHideOnSubPages: true
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    TabsPage,
    FavListPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalStorage, 
    CommonFunction,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
