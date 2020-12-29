import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers;

    if (headers.get('No-Auth') === 'True') {
      const clonedReq = req.clone({headers});
      return next.handle(clonedReq);
    }

    const token = AuthService.getToken();
    if (!!token) {
      if (!headers.has('Authorization')) {
        headers = headers.append('Authorization', `Bearer ${token}`);
      }
      const clonedReq = req.clone({headers});
      return next.handle(clonedReq).pipe(catchError(this.handleError.bind(this)));
      // if (!AuthService.isTokenExpired(token)) {
      //
      // } else {
      //   AuthService.redirectUrl = window.location.pathname;
      //   this.router.navigate(['/'], {fragment: AuthService.fragmentKeyLoginModal})
      //     .then(() => {
      //       // this.toastr.warning('Vous devez être connecté pour effectuer cette action !')
      //     });
      // }
    } else {
      AuthService.redirectUrl = window.location.pathname;
      this.router.navigate(['/'], {fragment: AuthService.fragmentKeyLoginModal});
    }

  }

  private handleError(err: HttpErrorResponse) {
    if (!!err.error) {
      if (!!err.error.message) {
        if (err.error.message.indexOf(`Route [login] not defined.`) >= 0) {
          AuthService.removeToken();
          AuthService.redirectUrl = window.location.pathname;
          this.router.navigate(['/'], {fragment: AuthService.fragmentKeyLoginModal});
        }
      }
      if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${err.status}, body was: `, err.error);
      }
    }
    if (err.status === 401) {
      AuthService.removeToken();
      this.authService.resetRoles();
      AuthService.redirectUrl = window.location.pathname;
      this.router.navigate(['/']);
      window.location.reload();
      // this.toastr.error('Vous êtes resté trop longtemps inactif veuillez vous reconnectez, vous allez être redirigé vers la page de connexion');
    }
    // return an observable with a user-facing error message
    return throwError(!!err.error ? err.error.message : 'Something bad happened; please try again later.');
  }

}
