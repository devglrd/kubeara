import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {
  HomeComponent,
  WebsiteComponent,
} from '../components';

const routes: Routes = [
  {
    path: '',
    component: WebsiteComponent,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'},
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class WebsiteRouting {
}
