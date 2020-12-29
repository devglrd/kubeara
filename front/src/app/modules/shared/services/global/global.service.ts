import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';

import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public url = environment.baseUrl + '/speedSearch';

  constructor(private http: HttpClient) {
  }

}
