import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {map} from 'rxjs/operators';

import {environment} from '../../../../../environments/environment';
import {isPlatformBrowser} from '@angular/common';

let PLATEFORMID: Object;

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  private static localStorageKeys = {
    helpers: 'helpers_accept',
  };
  private globalUrl = environment.baseUrl + '/helpers';
  private appUrl = environment.baseUrl + '/app/helpers';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    PLATEFORMID = platformId;
  }

  public static setHelpersInLocalStorage(accept) {
    if (!!PLATEFORMID) {
      if (isPlatformBrowser(PLATEFORMID)) {
        localStorage.setItem(HelpersService.localStorageKeys.helpers, accept);
      }
    }
  }

  public static removeHelpersInLocalStorage() {
    if (!!PLATEFORMID) {
      if (isPlatformBrowser(PLATEFORMID)) {
        localStorage.removeItem(HelpersService.localStorageKeys.helpers);
      }
    }
  }

  public static getHelpersInLocalStorage(): boolean {
    if (!!PLATEFORMID) {
      if (isPlatformBrowser(PLATEFORMID)) {
        return !!localStorage.getItem(HelpersService.localStorageKeys.helpers)
          ? localStorage.getItem(HelpersService.localStorageKeys.helpers) === 'true'
          : false;
      }
    }
  }

  public getHelpers(page: string) {
    return this.http.get(this.globalUrl + '/' + page, {headers: new HttpHeaders({'No-Auth': 'True'})})
      .pipe(map(res => res['data']));
  }

  public toggleHelpersFeature() {
    return this.http.get(this.appUrl + '/toggle');
  }

}
