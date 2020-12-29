import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AppGuard, AuthGuard} from '../guards';
import {WebsiteModule} from '../modules';

const routes: Routes = [
  // {
  //   path: 'theme',
  //   loadChildren: () => import('./../modules/theme/theme.module').then(m => m.ThemeModule),
  // },
  {
    path: 'app',
    loadChildren: () => import('./../modules/app/app.module').then(m => m.AppModule),
    canActivate: [AuthGuard, AppGuard],
    canLoad: [AuthGuard, AppGuard],
  },
  {
    path: '',
    loadChildren: () => import('./../modules/website/website.module').then(m => m.WebsiteModule),
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRouting {
}
