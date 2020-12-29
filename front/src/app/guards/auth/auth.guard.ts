import {CanActivate, CanLoad, Router} from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from '../../modules/shared/services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private router: Router, private auth: AuthService) {
  }

  public canActivate() {
    const token = localStorage.getItem('token_beu');
    if (!token) {
      AuthService.redirectUrl = window.location.pathname;
      this.router.navigate(['/']);
    }
    const user = this.auth.getUser().toPromise().catch(() => {
      AuthService.removeToken();
      this.router.navigate(['/']);
    });
    if (user) {
      return true;
    }

  }

  public canLoad() {
    return this.canActivate();
  }

}
