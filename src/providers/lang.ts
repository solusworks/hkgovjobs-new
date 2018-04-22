import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
// import { LocalStorage } from '../providers/local-storage';

@Injectable()
export class LangProvider {

  private
  currentLang: string = "tc";

  constructor() {

  }

  getCurrentLang(): string {
    return this.currentLang;
  }

  setCurrentLang(lang: string) {
    this.currentLang = lang;
  }

}
