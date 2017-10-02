import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav, Events } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonFunction } from '../providers/common-function';  
import { LocalStorage } from '../providers/local-storage';

import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

 


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = TabsPage;
  pages = [];

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
     public commonFunction: CommonFunction, public http : Http,
     public localStorage: LocalStorage,
     public events: Events
  ) {
    this.initializeApp();

    // set our app's pages
    /* this.pages = [
      { title: 'Hello Ionic', component: TabsPage },
      { title: 'My First List', component: TabsPage }
    ]; */
  }

  initializeApp() { 

    this.commonFunction.setRootScope( 'Lang', 'EN' ); // SCH, TCH 
  
    this.commonFunction.setRootScope( 'departmentLogo', [] );
    this.commonFunction.setRootScope( 'jobDataEN', [] );
    this.commonFunction.setRootScope( 'jobDataSCH', [] );
    this.commonFunction.setRootScope( 'jobDataTCH', [] );
 
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

        this.getJobs() ;
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  getJobs() {
     this.commonFunction.showLoading();
     this.departmentLogoListing();
   }


  departmentLogoListing() { 
      
        let path = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/dept_logo_map.json';
        let encodedPath = encodeURI(path);
        let timeoutMS = 30000;
         let headers = new Headers({ 'Content-Type': 'application/json' });  
        let options = new RequestOptions({ headers: headers });  

        this.http.get(encodedPath,options)
            .timeout(timeoutMS)
            .map(res => res.json()).subscribe(data => {
                let responseData = data;
                 
               // console.log(responseData); 
                this.commonFunction.setRootScope( 'departmentLogo', responseData );

                 this.getJobsEN();

            },
            err => {
                
                console.log('error in departmentLogoListing');
                 this.commonFunction.hideLoading();
               //  console.log(err); 
                  this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
                //this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {} );
            });
  }

  getJobsEN() { 

        let path = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/eng.json';
        let encodedPath = encodeURI(path);
        let timeoutMS = 30000;
         let headers = new Headers({ 'Content-Type': 'application/json' });  
        let options = new RequestOptions({ headers: headers });  

        this.http.get(encodedPath,options)
            .timeout(timeoutMS)
            .map(res => res.json()).subscribe(data => {
                let responseData = data;
               // console.log(responseData); 
                this.commonFunction.setRootScope( 'jobDataEN', responseData );
               this.events.publish('list:updated', Date.now() );
                this.getJobsSCH();
            },
            err => {
                console.log('error in getJobs');
                 this.commonFunction.hideLoading();
               //  console.log(err); 
                  this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
               // this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {});
            });
  }

    getJobsSCH() { 
        //Simplified Chinese
        let path = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/sc.json';
        let encodedPath = encodeURI(path);
        let timeoutMS = 30000;
         let headers = new Headers({ 'Content-Type': 'application/json' });  
        let options = new RequestOptions({ headers: headers });  

        this.http.get(encodedPath,options)
            .timeout(timeoutMS)
            .map(res => res.json()).subscribe(data => {
                let responseData = data;
               // console.log(responseData); 
                this.commonFunction.setRootScope( 'jobDataSCH', responseData );

                 this.getJobsTCH();
            },
            err => {
                console.log('error in getJobs');
                 this.commonFunction.hideLoading();

                  this.getJobsTCH();
               //  console.log(err); 
                 this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
                // this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {});
            });
  }

  getJobsTCH() { 
        //Traditional Chinese
        let path = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/tc.json';
        let encodedPath = encodeURI(path);
        let timeoutMS = 30000;
         let headers = new Headers({ 'Content-Type': 'application/json' });  
        let options = new RequestOptions({ headers: headers });  

        this.http.get(encodedPath,options)
            .timeout(timeoutMS)
            .map(res => res.json()).subscribe(data => {
                let responseData = data;

               
               // console.log(responseData); 
                this.commonFunction.setRootScope( 'jobDataSCH', responseData );

                this.commonFunction.hideLoading();


            },
            err => {
                console.log('error in getJobs');
                 this.commonFunction.hideLoading();
               //  console.log(err); 
                  this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
               // this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {} );
            });
  }

}
