import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { MasterPage } from '../pages/master/master';
import { KhadmobProvider, AdMobType } from 'khads';
import { CONFIG } from '../../global';
// import { KhverProvider } from 'khver';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = MasterPage;

  constructor(platform: Platform, statusBar: StatusBar, public khadmob: KhadmobProvider
    // public khver: KhverProvider
  ) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      // splashScreen.hide();
      // khver.getIsNeedUpdate().then( res => {

      //   if(res) {
      //     khver.showUpdatePrompt();
      //   }

      // });

      if (platform.is('cordova')) {
        this.prepareAdBanner();
      }

    });
  }

  prepareAdBanner() {

    let androidId: AdMobType = {
      banner: CONFIG.android.banner_ad,
      interstitial: CONFIG.android.interstitial
    };

    let iosId: AdMobType = {
      banner: CONFIG.ios.banner_ad,
      interstitial: CONFIG.ios.interstitial
    };

    this.khadmob.setAdmobId(androidId, iosId);
    this.khadmob.prepareBanner();
  }

}
