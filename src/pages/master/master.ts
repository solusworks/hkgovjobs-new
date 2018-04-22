import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { CommonFunction } from '../../providers/common-function';
import { LocalStorage } from '../../providers/local-storage';

import { Http, Headers, RequestOptions } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { CONFIG } from '../../../global';

@Component({
  selector: 'page-master',
  templateUrl: 'master.html',
})
export class MasterPage {

  root = TabsPage;
  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public menu: MenuController,
    // public splashScreen: SplashScreen,
    public navCtrl: NavController,
    public navParams: NavParams,
    public commonFunction: CommonFunction,
    public http: Http,
    public localStorage: LocalStorage,
    public events: Events
  ) {
    this.initializeApp();
  }

  initializeApp() {

    //this.commonFunction.setRootScope( 'deptSimplifiedChi', 'deptChi' );
    this.commonFunction.setRootScope('deptSimplifiedChi', 'deptSimplifiedChi');

    this.commonFunction.setRootScope('Lang', 'TCH'); // SCH, TCH, EN

    if (this.localStorage.get('Lang', '')) {
      this.commonFunction.setRootScope('Lang', this.localStorage.get('Lang', 'TCH')); // SCH, TCH 
    } else {
      this.localStorage.get('Lang', 'TCH') // default;
    }

    this.commonFunction.setRootScope('departmentMenu', []);
    this.commonFunction.setRootScope('departmentMenuEN', []);
    this.commonFunction.setRootScope('departmentMenuSCH', []);
    this.commonFunction.setRootScope('departmentMenuTCH', []);

    this.commonFunction.setRootScope('departmentLogo', []);
    this.commonFunction.setRootScope('jobDataEN', []);
    this.commonFunction.setRootScope('jobDataSCH', []);
    this.commonFunction.setRootScope('jobDataTCH', []);


    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // this.splashScreen.hide();

      this.getJobs();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  getJobs() {
    // this.commonFunction.showLoading();
    this.departmentLogoListing();
  }


  departmentLogoListing() {

    let path = CONFIG.dsUrl + 'dept_logo_map.json';
    let encodedPath = encodeURI(path);
    let timeoutMS = 30000;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.get(encodedPath, options)
      .timeout(timeoutMS)
      .map(res => res.json()).subscribe(data => {
        let responseData = data;

        // console.log(responseData); 
        this.commonFunction.setRootScope('departmentLogo', responseData);

        this.getJobsEN();

      },
      err => {

        console.log('error in departmentLogoListing');
        this.commonFunction.hideLoading();
        //  console.log(err); 
        // this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
        //this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {} );
      });
  }

  getJobsEN() {

    let path = CONFIG.dsUrl + 'eng.json';
    let encodedPath = encodeURI(path);
    let timeoutMS = 30000;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.get(encodedPath, options)
      .timeout(timeoutMS)
      .map(res => res.json()).subscribe(data => {
        let responseData = data;
        // console.log(responseData); 
        this.commonFunction.setRootScope('jobDataEN', responseData);

        // this.commonFunction.setRootScope( 'departmentMenu', responseData );

        this.getDepartmentMenu(responseData, 'EN');

        if (this.commonFunction.rootScope['Lang'] == 'EN') {
          this.events.publish('list:updated', Date.now());
        }

        this.getJobsSCH();
      },
      err => {
        console.log('error in getJobs');
        this.commonFunction.hideLoading();
        //  console.log(err); 
        // this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
        // this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {});
      });
  }

  getJobsSCH() {
    //Simplified Chinese
    let path = CONFIG.dsUrl + 'sc.json';
    let encodedPath = encodeURI(path);
    let timeoutMS = 30000;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.get(encodedPath, options)
      .timeout(timeoutMS)
      .map(res => res.json()).subscribe(data => {
        let responseData = data;
        // console.log(responseData); 
        this.commonFunction.setRootScope('jobDataSCH', responseData);
        this.getDepartmentMenu(responseData, 'SCH');

        if (this.commonFunction.rootScope['Lang'] == 'SCH') {
          this.events.publish('list:updated', Date.now());
        }

        this.getJobsTCH();
      },
      err => {
        console.log('error in getJobs');
        this.commonFunction.hideLoading();

        // this.getJobsTCH();
        //  console.log(err); 
        // this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
        // this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {});
      });
  }

  getJobsTCH() {
    //Traditional Chinese
    let path = CONFIG.dsUrl + 'tc.json';
    let encodedPath = encodeURI(path);
    let timeoutMS = 30000;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    this.http.get(encodedPath, options)
      .timeout(timeoutMS)
      .map(res => res.json()).subscribe(data => {
        let responseData = data;


        // console.log(responseData); 
        this.commonFunction.setRootScope('jobDataTCH', responseData);
        this.getDepartmentMenu(responseData, 'TCH');

        if (this.commonFunction.rootScope['Lang'] == 'TCH') {
          this.events.publish('list:updated', Date.now());
        }
        this.commonFunction.hideLoading();


      },
      err => {
        console.log('error in getJobs');
        this.commonFunction.hideLoading();
        //  console.log(err); 
        // this.commonFunction.presentToast('There is some error in data fetching, Please try again.');
        // this.commonFunction.showAlert("There is some error in data fetching, please try again.", 'OK', (d) => {} );
      });
  }


  ChangeLanguage(type) {


    this.events.publish('tab:defaultSelection', Date.now());

    this.commonFunction.setRootScope('Lang', type);

    this.localStorage.set('Lang', type);

    let menu = [];
    if (type == 'SCH') {
      menu = this.commonFunction.rootScope['departmentMenuSCH'];

    } else if (type == 'TCH') {
      menu = this.commonFunction.rootScope['departmentMenuTCH'];
    } else {
      menu = this.commonFunction.rootScope['departmentMenuEN'];
    }



    this.commonFunction.setRootScope('departmentMenu', this.sortMenu(menu));


    this.events.publish('list:filtered', 'Language', { type: type });
  }

  SearchByJobType(type) {
    this.events.publish('tab:defaultSelection', Date.now());
    //1 -> full, 2 -> part, 3 -> intern 
    //this.commonFunction.setRootScope( 'Lang', 'EN' ); // reset
    this.events.publish('list:filtered', 'JobType', { type: type });

  }

  SearchByDepartment(data) {
    this.events.publish('tab:defaultSelection', Date.now());
    //this.commonFunction.setRootScope( 'Lang', 'EN' ); // reset
    this.events.publish('list:filtered', 'Department', { deptnamejve: data });
  }

  imageError(myEvent) {
    //console.log(myEvent);
    myEvent.target.src = CONFIG.dsUrl + 'images/dept_logos/logo_hksar.png';
  }


  filterItemsImg(searchDepartment) {

    let url = '';

    let department = this.commonFunction.rootScope['departmentLogo'];

    for (let i = 0; i < department.length; i++) {
      // console.log( this.commonFunction.rootScope['departmentLogo'][i]['deptEn'] );

      if (this.commonFunction.rootScope['Lang'] == 'undefined' || this.commonFunction.rootScope['Lang'] == 'EN') {
        if (this.commonFunction.rootScope['departmentLogo'][i]['deptEn'].indexOf(searchDepartment) > -1) {

          url = CONFIG.dsUrl + 'images/dept_logos/' + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] + '.png';
          break;
        } else {
          url = CONFIG.dsUrl + 'images/dept_logos/logo_hksar.png';
        }
      } else {

        if (this.commonFunction.rootScope['Lang'] == 'TCH') {

          if (this.commonFunction.rootScope['departmentLogo'][i]['deptChi'].indexOf(searchDepartment) > -1) {

            url = CONFIG.dsUrl + 'images/dept_logos/' + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] + '.png';
            break;
          } else {
            url = CONFIG.dsUrl + 'images/dept_logos/logo_hksar.png';
          }

        } else {
          // sch simplified 
          let deptSimplifiedChi = this.commonFunction.rootScope['deptSimplifiedChi'];

          if (this.commonFunction.rootScope['departmentLogo'][i][deptSimplifiedChi].indexOf(searchDepartment) > -1) {

            url = CONFIG.dsUrl + 'images/dept_logos/' + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] + '.png';
            break;
          } else {
            url = CONFIG.dsUrl + 'images/dept_logos/logo_hksar.png';
          }


        }

      }

    }

    return url;

  }


  getDepartmentMenu(jobArray, lang) {

    /*
    
    let pp = []
       let ch = "衞生署";
        pp.push(ch);
        if( ! ( pp.indexOf( ch ) > -1 ) ){
            pp.push(ch);
        }
       console.log(pp );
       */
    let filterdData = [];
    if (lang == 'SCH') {

      for (let i = 0; i < jobArray.length; i++) {

        if (!(filterdData.indexOf(jobArray[i].cdeptnamejve) > -1)) {
          filterdData.push(jobArray[i].cdeptnamejve);
        }

      }

      this.commonFunction.setRootScope('departmentMenuSCH', filterdData);

      if (this.commonFunction.rootScope['Lang'] == 'SCH') {
        this.commonFunction.setRootScope('departmentMenu', this.sortMenu(filterdData)); // default assign english
      }


    } else if (lang == 'TCH') {

      for (let i = 0; i < jobArray.length; i++) {

        if (!(filterdData.indexOf(jobArray[i].cdeptnamejve) > -1)) {
          filterdData.push(jobArray[i].cdeptnamejve);
        }
      }

      this.commonFunction.setRootScope('departmentMenuTCH', filterdData);

      if (this.commonFunction.rootScope['Lang'] == 'TCH') {
        this.commonFunction.setRootScope('departmentMenu', this.sortMenu(filterdData)); // default assign english
      }

    } else {
      //default EN
      for (let i = 0; i < jobArray.length; i++) {
        if (!(filterdData.indexOf(jobArray[i].deptnamejve) > -1)) {
          filterdData.push(jobArray[i].deptnamejve);
        }
      }


      this.commonFunction.setRootScope('departmentMenuEN', filterdData);

      if (this.commonFunction.rootScope['Lang'] == 'EN') {
        this.commonFunction.setRootScope('departmentMenu', this.sortMenu(filterdData)); // default assign english
      }

    }

  }

  sortMenu(arr) {
    //'zh-CN'
    arr.sort(function (a, b) {
      return a.localeCompare(b, ["zh-CN-u-co-pinyin"]);
    });
    return arr;
  }


}