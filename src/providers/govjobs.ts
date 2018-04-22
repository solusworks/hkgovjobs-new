import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
import { KhdsProvider } from 'khds';
import { CONFIG } from '../../global';

@Injectable()
export class GovjobsProvider {

  constructor(public khds: KhdsProvider) {
    // console.log('Hello GovjobsProvider Provider');
  }

  getDataList(lang: string): Promise<any> {
    // eng, tc, sc
    return new Promise((resolve, reject) => {

      this.khds.fetchData(CONFIG.dsUrl + lang + ".json").then(res => {
        resolve(res);
      });

    });

  }

}
