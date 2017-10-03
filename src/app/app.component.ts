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
    this.pages = [
      { title: 'Hello Ionic', component: TabsPage },
      { title: 'My First List', component: TabsPage }
    ]; 
  }

  initializeApp() { 

    this.commonFunction.setRootScope( 'Lang', 'EN' ); // SCH, TCH 
  
    this.commonFunction.setRootScope( 'departmentLogo', [] );
    this.commonFunction.setRootScope( 'jobDataEN', [] );
    this.commonFunction.setRootScope( 'jobDataSCH', [] );
    this.commonFunction.setRootScope( 'jobDataTCH', [] );
 
 /* let dep =  [{"deptEn":"Department of Health","deptChi":"è¡žç”Ÿç½²","logoName":"logo_dept_of_health"},{"deptEn":"Government Logistics Department","deptChi":"æ”¿åºœç‰©æµæœå‹™ç½²","logoName":"logo_gov_logistics_dept"},{"deptEn":"Leisure and Cultural Services Department","deptChi":"åº·æ¨‚åŠæ–‡åŒ–äº‹å‹™ç½²","logoName":"logo_leisure_culture_services_dept"},{"deptEn":"Immigration Department","deptChi":"å…¥å¢ƒäº‹å‹™è™•","logoName":"logo_immd"},{"deptEn":"Department of Justice","deptChi":"å¾‹æ”¿å¸","logoName":"logo_doj"},{"deptEn":"Social Welfare Department","deptChi":"ç¤¾æœƒç¦åˆ©ç½²","logoName":"logo_social_welfare_dept"},{"deptEn":"Land Registry","deptChi":"åœŸåœ°è¨»å†Šè™•","logoName":"logo_lands_dept"},{"deptEn":"Transport Department","deptChi":"é‹è¼¸ç½²","logoName":"logo_transport_dept"},{"deptEn":"Electrical and Mechanical Services Department","deptChi":"æ©Ÿé›»å·¥ç¨‹ç½²","logoName":"logo_emsd"},{"deptEn":"Home Affairs Department","deptChi":"æ°‘æ”¿äº‹å‹™ç¸½ç½²","logoName":"logo_home_affairs_dept"},{"deptEn":"Hong Kong Police Force","deptChi":"é¦™æ¸¯è­¦å‹™è™•","logoName":"logo_hkpf"},{"deptEn":"Treasury","deptChi":"åº«å‹™ç½²","logoName":"logo_treasury"},{"deptEn":"Fire Services Department","deptChi":"æ¶ˆé˜²è™•","logoName":"logo_fire_services_dept"},{"deptEn":"Radio Television Hong Kong","deptChi":"é¦™æ¸¯é›»å°","logoName":"logo_rthk"},{"deptEn":"Agriculture, Fisheries and Conservation Department","deptChi":"æ¼è¾²è‡ªç„¶è­·ç†ç½²","logoName":"logo_agriculture_fisheries_convervation_dept"},{"deptEn":"Rating and Valuation Department","deptChi":"å·®é¤‰ç‰©æ¥­ä¼°åƒ¹ç½²","logoName":"logo_rvd"},{"deptEn":"Education Bureau","deptChi":"æ•™è‚²å±€","logoName":"logo_hksar"},{"deptEn":"Post Office","deptChi":"éƒµæ”¿ç½²","logoName":"logo_hk_post_office"},{"deptEn":"Housing Department","deptChi":"æˆ¿å±‹ç½²","logoName":"logo_housing_authority"},{"deptEn":"Judiciary","deptChi":"å¸æ³•æ©Ÿæ§‹","logoName":"logo_judiciary"},{"deptEn":"Highways Department","deptChi":"è·¯æ”¿ç½²","logoName":"logo_highways_dept"},{"deptEn":"Development Bureau","deptChi":"ç™¼å±•å±€","logoName":"logo_hksar"},{"deptEn":"Census and Statistics Department","deptChi":"æ”¿åºœçµ±è¨ˆè™•","logoName":"logo_census_stat_dept"},{"deptEn":"Water Supplies Department","deptChi":"æ°´å‹™ç½²","logoName":"logo_water_supplies_dept"},{"deptEn":"Official Receiver's Office","deptChi":"ç ´ç”¢ç®¡ç†ç½²","logoName":"logo_oro"},{"deptEn":"Office of the Communications Authority","deptChi":"é€šè¨Šäº‹å‹™ç®¡ç†å±€è¾¦å…¬å®¤","logoName":"logo_ofnaa"},{"deptEn":"Office of the Government Chief Information Officer","deptChi":"æ”¿åºœè³‡è¨Šç§‘æŠ€ç¸½ç›£è¾¦å…¬å®¤","logoName":"logo_hksar"},{"deptEn":"Legal Aid Department","deptChi":"æ³•å¾‹æ´åŠ©ç½²","logoName":"logo_lad"}];
    this.commonFunction.setRootScope( 'departmentLogo', dep ); */

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


  ChangeLanguage(type){
    this.commonFunction.setRootScope( 'Lang', type );
     this.events.publish('list:filtered', 'Language', { type : type } );
  }

  SearchByJobType(type){
    //1 -> full, 2 -> part, 3 -> intern 
       this.commonFunction.setRootScope( 'Lang', 'EN' ); // reset
     this.events.publish('list:filtered', 'JobType', { type : type } );

  }

  SearchByDepartment(data){
     this.commonFunction.setRootScope( 'Lang', 'EN' ); // reset
    this.events.publish('list:filtered', 'Department', data );
  }

   imageError(myEvent){
    //console.log(myEvent);
    myEvent.target.src = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png' ;
  }

}
