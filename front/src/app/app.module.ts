import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from './modules/shared/services/auth/auth.interceptor';
import {AppRouting} from './routing/app.routing';
import {AppComponent} from './components';
import {GlobalErrorHandler} from './modules/shared/services/global/global-error.handler';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ToastrModule.forRoot(),
    AppRouting,
    BrowserAnimationsModule,
    BrowserTransferStateModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
