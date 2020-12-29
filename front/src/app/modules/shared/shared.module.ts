import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthInterceptor} from './services/auth/auth.interceptor';
import {DIRECTIVES} from './directives';
import {COMPONENTS} from './components';
import {SERVICES} from './services';
import {GUARDS} from './guards';
import {PIPES} from './pipes';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [
    ...SERVICES,
    ...GUARDS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    // {provide: ErrorHandler, useClass: GlobalErrorHandler},
    ...PIPES,
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  exports: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
})
export class SharedModule {
}
