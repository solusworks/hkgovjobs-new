import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { TabsPage } from '../pages/tabs/tabs';
import { MasterPage } from '../pages/master/master';
// import { KhadmobProvider, AdMobType } from 'khads';
import { CONFIG } from '../../global';
// import { KhverProvider } from 'khver';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = MasterPage;

  constructor(public platform: Platform, statusBar: StatusBar,
    private admobFree: AdMobFree,
    private splashScreen: SplashScreen
    // public khadmob: KhadmobProvider
    // public khver: KhverProvider
  ) {

    platform.ready().then(() => {

      statusBar.styleDefault();

      splashScreen.hide();
      // khver.getIsNeedUpdate().then(ioni res => {

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

    // let androidId: AdMobType = {
    //   banner: CONFIG.android.banner_ad,
    //   interstitial: CONFIG.android.interstitial
    // };

    // let iosId: AdMobType = {
    //   banner: CONFIG.ios.banner_ad,
    //   interstitial: CONFIG.ios.interstitial
    // };

    // this.khadmob.setAdmobId(androidId, iosId);
    // this.khadmob.prepareBanner();

    var bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config      
      isTesting: true,
      autoShow: true
    };

    if (this.platform.is('ios')) {
      bannerConfig.id = CONFIG.ios.banner_ad;
    } else {
      bannerConfig.id = CONFIG.ios.banner_ad;
    }

    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
      .then(() => {
      });
  }

}
