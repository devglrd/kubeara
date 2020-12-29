import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private url = environment.baseUrl;

  constructor(private http: HttpClient) {
  }


  public register(value) {
    console.log(value);
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(this.url + '/register', value, {headers: reqHeader}).pipe(map(res => res['data']));
  }

  public getActu() {
    return this.http.get(this.url + '/news', {headers: new HttpHeaders({'No-Auth': 'True'})})
      .pipe(map(res => res['data']));
  }

  public getOneActu(slug: string) {
    return this.http.get(this.url + '/news/' + slug, {headers: new HttpHeaders({'No-Auth': 'True'})})
      .pipe(map(res => res['data']));
  }

  public getPartners() {
    return this.http.get(this.url + '/partners/', {headers: new HttpHeaders({'No-Auth': 'True'})})
      .pipe(map(res => res['data']));
  }

  public getOnePartner(slug: string) {
    return this.http.get(this.url + '/partners/' + slug, {headers: new HttpHeaders({'No-Auth': 'True'})})
      .pipe(map(res => res['data']));
  }

  login(value: any) {
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(this.url + '/auth', value, {headers: reqHeader}).pipe(map(res => res['data']));
  }
}
