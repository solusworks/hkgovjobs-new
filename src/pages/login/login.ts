import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthDataProvider } from '../../providers/auth-data/auth-data';
// import { HomePage } from '../../pages/home/home'
// import { KhchatComponent as HomePage } from '../../components/khchat/khchat';

import { KhchatComponent as HomePage } from '../../components/khchat';
import { SignupPage } from '../../pages/signup/signup'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm;
  loading: any;
  loginErrorMsg: string = 'The email or password is not valid, please try again.';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authData: AuthDataProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUser(): void {

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        });
      }, error => {
        this.loading.dismiss().then(() => {
          let alert = this.alertCtrl.create({
            // message: error.message,
            message: this.loginErrorMsg,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }

  goToSignup(): void {
    this.navCtrl.push(SignupPage);
  }

}
