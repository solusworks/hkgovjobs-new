import { Injectable } from '@angular/core'; 


@Injectable()
export class LocalStorage {
  
  constructor() {
 
  } 

  set(key,value){
   window.localStorage[key] = value;
  }

  get(key,defaultValue){
   return window.localStorage[key] || defaultValue;
  }

  setObject(key,value){
   window.localStorage[key] = JSON.stringify(value);
   //this.localStorage.setObject('User2', {id:11, vlaue:'abbb'} );
  }

  getObject(key,defaultValue){

  if( defaultValue ){
    return JSON.parse(window.localStorage[key] || defaultValue );
  }else{
       return JSON.parse(window.localStorage[key] || '{}'); 
  }
 
   // this.localStorage.getObject('User2') ;
  }

  removeItem(key){
   window.localStorage.removeItem(key);
  }

  removeByIndex(index){
    window.localStorage.removeItem(window.localStorage.key(index));
  }

  clear(){
    window.localStorage.clear();
  }
  
}
