import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailsPage } from '../item-details/item-details';

 import { LocalStorage } from '../../providers/local-storage'; 
 import { CommonFunction } from '../../providers/common-function'; 


@Component({
  selector: 'page-fav-list',
  templateUrl: 'fav-list.html'
})
export class FavListPage {
  listData = [];
   listDataAll = [];
   constructor(  public commonFunction: CommonFunction, public localStorage: LocalStorage, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter');
     //this.initializeItems();
    this.initializeItems(); 
  }

 initializeItems(){
    if( this.commonFunction.rootScope['Lang'] == 'undefined' || this.commonFunction.rootScope['Lang'] == 'EN' ){
       this.listDataAll = this.commonFunction.rootScope['jobDataEN'];
   }else if(  this.commonFunction.rootScope['Lang'] == 'SCH' ){
       this.listDataAll = this.commonFunction.rootScope['jobDataSCH'];
   }else if(  this.commonFunction.rootScope['Lang'] == 'TCH' ){
       this.listDataAll = this.commonFunction.rootScope['jobDataTCH'];
   }else{
      this.listDataAll = this.commonFunction.rootScope['jobDataEN'];
   } 
   this.chekAlreadyFav();
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
                if( this.commonFunction.rootScope['departmentLogo'][i]['deptEn'].indexOf( searchDepartment ) > -1 ){

                  url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/'  + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] +'.png' ;
                 break;
                }else{
                 url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png'; 
                }
            }else{

               if( this.commonFunction.rootScope['Lang'] == 'TCH' ){

                  if( this.commonFunction.rootScope['departmentLogo'][i]['deptChi'].indexOf( searchDepartment ) > -1 ){

                      url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/'  + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] +'.png' ;
                     break;
                    }else{
                     url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png'; 
                    }

               }else{
                  // sch simplified 
                let deptSimplifiedChi = this.commonFunction.rootScope['deptSimplifiedChi'];

                 if( this.commonFunction.rootScope['departmentLogo'][i][deptSimplifiedChi].indexOf( searchDepartment ) > -1 ){

                      url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/'  + this.commonFunction.rootScope['departmentLogo'][i]['logoName'] +'.png' ;
                     break;
                    }else{
                     url = 'https://s3-ap-northeast-1.amazonaws.com/hkgovjobs/images/dept_logos/logo_hksar.png'; 
                    }


               } 

            }

        }  
          
        return url;
 
  }

    itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }


  FavUnfavStar(e, item, isFavAlready, indexList ){

    
    /*  console.log(item);
       console.log(isFavAlready);
       console.log('-------');
        console.log(indexList);
  console.log('-------'); */

     var favArr  = [];

    var allFavIds = this.localStorage.getObject('favJobIds' , '[]' )
   //  console.log(allFavIds);
    favArr = allFavIds;

     if( isFavAlready ){
     let index = favArr.indexOf(  item.jobid );
     if( index > -1 ){
        favArr.splice(index, 1); // remove fav

       // this.listData[indexList].star = false; 
           this.listData.splice(indexList, 1);
       // delete this.listData[indexList];
     }
     
    //  this.commonFunction.presentToast('Removed from favourites');

    }else{
    
      let currentId = item.jobid;
       favArr.push( currentId  );
       
        this.listData[indexList].star = true; 

      //  this.commonFunction.presentToast('Added to favourites');
    }  
   // console.log(favArr);
    this.localStorage.setObject('favJobIds', favArr );
     console.log( this.localStorage.getObject('favJobIds' , '[]' ) );   
  }
 
  chekAlreadyFav(){

    this.listData = [];

    let allFavIds = this.localStorage.getObject('favJobIds' , '[]'  );
     /* console.log(allFavIds);
       console.log(this.listData); */
    for( let i = 0; i < this.listDataAll.length ; i++){ 
      
      for( let j = 0; j < allFavIds.length ; j++){ 
      if( this.listDataAll[i].jobid == allFavIds[j] ){
        // yes fav
          this.listDataAll[i].star = true;
           this.listData.push( this.listDataAll[i] ); 
         break;
      }
     } 
    }
  }

salaryFormat(num){
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
   } 


}
