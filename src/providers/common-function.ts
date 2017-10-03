import { Injectable } from '@angular/core';
import { LoadingController,AlertController, ToastController  } from 'ionic-angular'; 
 
@Injectable()
export class CommonFunction {
  
  loader : any;
  alert : any;
  confirm : any;  

  public rootScope: {} =  {};
 
  constructor( public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
  }   
    
 setRootScope(key,value) { 
    this.rootScope[key] = value;

    //this.commonFunction.setRootScope( 'test2', 'vaa' );
    //this.commonFunction.setRootScope( 'test2', {a : 'test', b : 'test2'} );
    //this.commonFunction.setRootScope( 'test2', [{a : 'test', b : 'test2'},{a : 'test2', b : 'test22'}] );

   // for access  commonFunction.rootScope | json
   //console.log(this.commonFunction.rootScope['test2'][0]['a']);
  }

   deleteRootScope(key) { 
     if( this.rootScope[key] != undefined )
    delete this.rootScope[key];
  }

  clearRootScope() { 
       this.rootScope = {};
  }
 

  showLoading() {
    this.loader = this.loadingCtrl.create({ 
     content: 'Downloading latest jobs positions...'
    });
    this.loader.present();
    //this.commonFunction.showLoading();
  } 

  hideLoading() { 
   // setTimeout(()=>{
      this.loader.dismiss().catch(() => console.log('loader was not dismissed'));
    //  }, 0);
    //this.commonFunction.hideLoading();
  }

  presentToast(msg) {
  const toast = this.toastCtrl.create({
    message: msg,
    duration: 2500,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  showAlert(message, okbtn, callback) {

    this.alert = this.alertCtrl.create({
      title: 'HKGovJobs',  
      message : message , 
      buttons: [
            { 
              'text' : okbtn ,
                handler: () => {
                  console.log('clicked'); 
                  callback(true);
                }
          }
        ]
    });
    this.alert.present();
    //this.commonFunction.showAlert('<b>fsaff</b>', 'Ok', (d) => { } ) ;  
  } 
 

}