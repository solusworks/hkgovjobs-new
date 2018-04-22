import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController, Events } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';
import { LocalStorage } from '../../providers/local-storage';
import { CommonFunction } from '../../providers/common-function';
import { PopoverPage } from '../popover/popover';
import { GovjobsProvider } from '../../providers/govjobs';
import { LangProvider } from '../../providers/lang';
import { CONFIG } from '../../../global';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {

  listData: any[] = [];
  listSearch: string = '';

  constructor(public gjProvider: GovjobsProvider,
    public langProvider: LangProvider,
    public events: Events,
    public popoverCtrl: PopoverController,
    public commonFunction: CommonFunction,
    public localStorage: LocalStorage,
    public navCtrl: NavController,
    public navParams: NavParams) {
      
    // console.log(this.commonFunction.rootScope['Lang']);

    this.events.subscribe('list:updated', (time) => {
      console.log('list:updated');
      this.initializeItems();
    });

    this.events.subscribe('list:filtered', (type, data) => {
      console.log('list:filtered');
      this.listSearch = ''; // reset any selection of menu
      this.filterItems(type, data);
    });
    console.log('list constructor');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');

    this.listSearch = ''; // reset any selection of menu
    this.initializeItems();

    this.chekAlreadyFav();
  }

  initializeItems() {

    // if (this.commonFunction.rootScope['Lang'] == 'undefined' || this.commonFunction.rootScope['Lang'] == 'EN') {

    //this.listData = this.commonFunction.rootScope['jobDataEN'];
    this.gjProvider.getDataList(this.langProvider.getCurrentLang()).then(res => {
      this.listData = res;
      this.chekAlreadyFav();
    });

    // } else if (this.commonFunction.rootScope['Lang'] == 'SCH') {

    //   this.listData = this.commonFunction.rootScope['jobDataSCH'];


    // } else if (this.commonFunction.rootScope['Lang'] == 'TCH') {
    //   this.listData = this.commonFunction.rootScope['jobDataTCH'];
    // } else {
    //   this.listData = this.commonFunction.rootScope['jobDataEN'];
    // }
    // this.chekAlreadyFav();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    let jobname = '';
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listData = this.listData.filter((item) => {

        if (this.commonFunction.rootScope['Lang'] == 'SCH' || this.commonFunction.rootScope['Lang'] == 'TCH') {
          jobname = item.cjobname.toLowerCase();
        } else {
          jobname = item.jobname.toLowerCase();
        }

        return (jobname.indexOf(val.toLowerCase()) > -1);
      })
    }
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

  presentPopover(myEvent, data) {
    let popover = this.popoverCtrl.create(PopoverPage, data);
    popover.present({
      ev: myEvent
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }

  filterItems(type, data) {

    // console.log(data);

    if (this.commonFunction.rootScope['Lang'] == 'undefined' || this.commonFunction.rootScope['Lang'] == 'EN') {
      this.listData = this.commonFunction.rootScope['jobDataEN'];
    } else if (this.commonFunction.rootScope['Lang'] == 'SCH') {
      this.listData = this.commonFunction.rootScope['jobDataSCH'];
    } else if (this.commonFunction.rootScope['Lang'] == 'TCH') {
      this.listData = this.commonFunction.rootScope['jobDataTCH'];
    } else {
      this.listData = this.commonFunction.rootScope['jobDataEN'];
    }

    // this.chekAlreadyFav();

    //alert(  this.listData.length );

    if (type == 'JobType') {

      this.listData = this.listData.filter((item) => {
        if (data.type == 1) {
          return item.minpaym ? true : false;
        } else if (data.type == 2) {
          return item.minpayh ? true : false;
        } else if (data.type == 3) {
          return item.minpayd ? true : false;
        } else {
          return false;
        }
      });

    } else if (type == 'Department') {

      let departmentMatching = '';
      departmentMatching = data.deptnamejve;

      let dept = '';
      if (departmentMatching && departmentMatching != 'All') {
        this.listData = this.listData.filter((item) => {

          if (this.commonFunction.rootScope['Lang'] == 'SCH' || this.commonFunction.rootScope['Lang'] == 'TCH') {
            dept = item.cdeptnamejve;
          } else {
            dept = item.deptnamejve;
          }

          return (dept.indexOf(departmentMatching) > -1);
        })
      }

    }


  }

  FavUnfavStar(e, item, isFavAlready, indexList) {


    console.log(item);
    console.log(isFavAlready);
    console.log('-------');
    console.log(indexList);
    console.log('-------');

    var favArr = [];

    var allFavIds = this.localStorage.getObject('favJobIds', '[]')
    console.log(allFavIds);
    favArr = allFavIds;

    if (isFavAlready) {
      let index = favArr.indexOf(item.jobid);
      if (index > -1) {
        favArr.splice(index, 1); // remove fav

        this.listData[indexList].star = false;
      }

      //  this.commonFunction.presentToast('Removed from favourites');

    } else {

      let currentId = item.jobid;
      favArr.push(currentId);

      this.listData[indexList].star = true;

      //  this.commonFunction.presentToast('Added to favourites');
    }
    console.log(favArr);
    this.localStorage.setObject('favJobIds', favArr);
    console.log(this.localStorage.getObject('favJobIds', '[]'));
  }

  chekAlreadyFav() {
    let allFavIds = this.localStorage.getObject('favJobIds', '[]');
    /* console.log(allFavIds);
      console.log(this.listData); */
    for (let i = 0; i < this.listData.length; i++) {
      this.listData[i].star = false;
      for (let j = 0; j < allFavIds.length; j++) {
        if (this.listData[i].jobid == allFavIds[j]) {
          // yes fav
          this.listData[i].star = true;
          break;
        }
      }
    }
  }

  salaryFormat(num) {
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }

}

