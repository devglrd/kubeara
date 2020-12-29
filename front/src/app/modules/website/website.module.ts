import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';
import {NgModule} from '@angular/core';

import {WebsiteRouting} from './routing/website.routing';
import {SharedModule} from '../shared/shared.module';
import {COMPONENTS} from './components';
import {SERVICES} from './services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WebsiteRouting,
    ToastrModule
  ],
  declarations: [...COMPONENTS],
  providers: [...SERVICES],
})
export class WebsiteModule {
  constructor() {
    console.log('ok');
  }
}
