import {distinctUntilChanged, map, takeUntil, tap} from 'rxjs/operators';
import {Inject, Injectable, OnDestroy, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

import {environment} from '../../../../../environments/environment';
import {HelpersService} from '../helpers/helpers.service';

interface ITokenPayload {
  aud: string;
  exp: number;
  iat: number;
  jti: string;
  nbf: number;
  scopes: string[];
  sub: string;
}

let PLATEFORMID: Object;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  public static redirectUrl: string;
  public static fragmentKeyLoginModal = 'login';
  private static tokenString = 'token_beu';

  private roles: string[] = [];
  private url = environment.baseUrl + '/app';
  private global_url = environment.baseUrl;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private http: HttpClient,
              private router: Router) {
    this.roles = AuthService.getRolesFormLocalStorage();
    PLATEFORMID = platformId;

  }

  public static getTokenExpirationDate(token: string): Date {
    console.log(token);
    const decoded = jwt_decode(token);
    console.log(decoded);
    if (decoded.exp == null) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public static removeToken() {
    if (!!PLATEFORMID) {
      if (isPlatformBrowser(PLATEFORMID)) {
        localStorage.removeItem(AuthService.tokenString);
      }
    }
  }

  public static hasToken() {
    if (!!PLATEFORMID) {
      if (isPlatformBrowser(PLATEFORMID)) {
        return !!localStorage.getItem(AuthService.tokenString);
      }
    }
  }

  public static getToken(): string {
    if (!!PLATEFORMID) {
      if (isPlatformBrowser(PLATEFORMID)) {
        return localStorage.getItem(AuthService.tokenString);
      }
    }
  }

  public static setToken(token: string) {
    if (!!PLATEFORMID) {
      if (isPlatformBrowser(PLATEFORMID)) {
        localStorage.setItem(AuthService.tokenString, token);
      }
    }
  }

  public static isTokenExpired(token?: string): boolean {
    if (!token) {
      token = AuthService.getToken();
    }

    if (!token) {
      return true;
    }
    console.log('1');
    const date = AuthService.getTokenExpirationDate(token);
    console.log('2');
    if (date == null) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  public static decodeToken(): ITokenPayload | null {
    const token = AuthService.getToken();
    return !!token ? jwt_decode(token) : null;
  }

  public static getSub(): ITokenPayload | null {
    const token = AuthService.getToken();
    return !!token ? jwt_decode(token).sub : null;
  }

  public static getRolesFormLocalStorage(): string[] {
    const token = AuthService.getToken();
    return !!token ? jwt_decode(token).scopes.filter(scope => scope.indexOf('access') === -1) : null;
  }

  public isEvaluator(): boolean {
    return this.hasRole('evaluateur-encadrant') || this.isSuperManager();
  }

  public isStudent(): boolean {
    return this.hasRole('etudiant');
  }

  public isManager(): boolean {
    return this.hasRole('manager') || this.isSuperManager();
  }

  public isAdmin(): boolean {
    return this.hasRole('supermanager');
  }

  public isSuperManager(): boolean {
    return this.hasRole('supermanager');
  }

  public getRoles(): string[] {
    return this.roles;
  }

  public hasRole(expected: string) {
    return this.getRoles().indexOf(expected) >= 0;
  }

  public getUser() {
    return this.http.get(this.url + '/tenant').pipe(
      map(({data}: { data: any }) => data),
      tap((data: { user: any, access_token: string, roles: string[] }) => {
        return data;
      }));
  }

  public login(credentials) {
    return this.http.post(this.global_url + '/kedge/login', credentials, {headers: new HttpHeaders({'No-Auth': 'True'})})
      .pipe(
        map(({data}: { data: any }) => data),
        tap((data: { user: any, access_token: string, roles: string[] }) => {
          this.roles = data.roles;
          AuthService.setToken(data.access_token);
          HelpersService.setHelpersInLocalStorage(data.user.tutorials_accept);
        }),
      );
  }

  public logout() {
    return this.http.get(this.url + '/logout');
  }

  public resetRoles() {
    this.roles = [];
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public redirectAfterLogin(user) {
    let url = '/';
    if (!!AuthService.redirectUrl) {
    } else if (!this.isOnlyEvaluator()) {
      // console.log('user cgu :', user.cgu_accept);
      // if (!user.cgu_accept) {
      //   url = '/cgu';
      // }
      if (user.first_log) {
        url = '/onboarding';
      }
    } else if (this.isStudent()) {
      url = '/app';
    } else if (this.isEvaluator()) {
      url = '/evaluator';
    } else if (this.isManager()) {
      url = '/manager';
    }

    return this.router.navigateByUrl(url);
  }

  public checkOnboarding(user) {
    if (user.first_log) {
      this.router.navigateByUrl('/onboarding');
    } else {
      this.redirectAfterLogin(user);
    }
  }

  public isOnlyEvaluator() {
    return this.hasRole('evaluateur-encadrant') && !this.isSuperManager() && !this.isStudent();
  }

}
