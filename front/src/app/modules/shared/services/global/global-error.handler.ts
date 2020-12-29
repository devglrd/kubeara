import {ErrorHandler, Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    console.log(error);
    // if (!!error) {
    //   if (!!error.message) {
    //     // console.log('GlobalErrorHandler :', /Loading chunk [\d]+ failed/.test(error.message),
    //       error.message.indexOf('Loading chunk'), error.message.indexOf('failed'));
    //     if (/Loading chunk [\d]+ failed/.test(error.message) ||
    //       error.message.indexOf('Loading chunk') && error.message.indexOf('failed')) {
    //       window.location.reload();
    //     }
    //   }
    // }
  }
}
