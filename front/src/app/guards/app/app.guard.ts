import {CanActivate, CanLoad, Route, UrlSegment} from '@angular/router';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanActivate, CanLoad {

  constructor() {
  }

  public canActivate() {
    return true;
  }

  public canLoad(route: Route, segments: UrlSegment[]) {
    return this.canActivate();
  }

}
