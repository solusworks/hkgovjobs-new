import { Component } from '@angular/core';

import { NavController, NavParams, PopoverController, Events } from 'ionic-angular';
 
import { ItemDetailsPage } from '../item-details/item-details';
 import { LocalStorage } from '../../providers/local-storage'; 
 import { CommonFunction } from '../../providers/common-function'; 
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
   
  listData = [];

  constructor(public events: Events, public popoverCtrl: PopoverController, public commonFunction: CommonFunction, public localStorage: LocalStorage, public navCtrl: NavController, public navParams: NavParams) {
    // console.log(this.commonFunction.rootScope['Lang']);

    this.events.subscribe('list:updated', ( time ) => { 
      console.log('list:updated');
       this.initializeItems();
    });

  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
    this.initializeItems();
  }


  initializeItems(){
    if( this.commonFunction.rootScope['Lang'] == 'undefined' || this.commonFunction.rootScope['Lang'] == 'EN' ){
       this.listData = this.commonFunction.rootScope['jobDataEN'];
   }else if(  this.commonFunction.rootScope['Lang'] == 'SCH' ){
       this.listData = this.commonFunction.rootScope['jobDataSCH'];
   }else if(  this.commonFunction.rootScope['Lang'] == 'TCH' ){
       this.listData = this.commonFunction.rootScope['jobDataTCH'];
   }else{
      this.listData = this.commonFunction.rootScope['jobDataEN'];
   } 

  }

 getItems(ev: any) {
    // Reset items back to all of the items
     this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.listData = this.listData.filter((item) => {
        return (item.jobname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  imageError(myEvent){
    //console.log(myEvent);
    myEvent.target.src = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png' ;
  }

  filterItemsImg(searchDepartment){
        
         let url = '';
         
         let department = this.commonFunction.rootScope['departmentLogo'];

         for(let i = 0; i < department.length ; i++){
         // console.log( this.commonFunction.rootScope['departmentLogo'][i]['deptEn'] );

            if( this.commonFunction.rootScope['Lang'] == 'undefined' || this.commonFunction.rootScope['Lang'] == 'EN' ){
                if( this.commonFunction.rootScope['departmentLogo'][i]['deptEn'].toLowerCase().indexOf( searchDepartment.toLowerCase() ) > -1 ){

                  url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/'  + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] +'.png' ;
                 break;
                }else{
                 url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png'; 
                }
            }else{
                 if( this.commonFunction.rootScope['departmentLogo'][i]['deptChi'].toLowerCase().indexOf( searchDepartment.toLowerCase() ) > -1 ){

                  url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/'  + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] +'.png' ;
                 break;
                }else{
                 url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png'; 
                }
            }

        }  
          
        return url;
 
  }
 

  presentPopover(myEvent, data){
     let popover = this.popoverCtrl.create(PopoverPage,  data);
    popover.present({
      ev: myEvent
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }
}

