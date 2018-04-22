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
import { MasterPage } from '../pages/master/master';
import { ChatPage } from '../pages/chat/chat';
import { StatusBar } from '@ionic-native/status-bar';
import { CommonFunction } from '../providers/common-function';
import { LocalStorage } from '../providers/local-storage';
import { EventDataProvider } from '../providers/event-data/event-data';
import { ProfileDataProvider } from '../providers/profile-data/profile-data';
import { AuthDataProvider } from '../providers/auth-data/auth-data';
import { KHChatModule } from '../components/khchat.module';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    TabsPage,
    FavListPage,
    PopoverPage,
    MasterPage,
    // ChatPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    }),
    khdsModule
    // , khmoreModule
    ,khadsModule, KHChatModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    TabsPage,
    FavListPage,
    PopoverPage,
    MasterPage,
    // ChatPage
  ],
  providers: [
    StatusBar,
    LocalStorage,
    CommonFunction,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GovjobsProvider,
    LangProvider,
    // EventDataProvider,
    // ProfileDataProvider,
    // AuthDataProvider
  ]
})
export class AppModule { }

import { ComponentsModule as khdsModule } from "khds";
import { GovjobsProvider } from '../providers/govjobs';
import { LangProvider } from '../providers/lang';
// import { ComponentsModule as khmoreModule } from "khmore";
import { ComponentsModule as khadsModule } from "khads";
//import { ComponentsModule as khverModule  } from "khver";