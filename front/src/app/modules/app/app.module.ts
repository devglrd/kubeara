import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from './components/app/app.component';
import {AppRouting} from './routing/app.routing';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    AppRouting
  ]
})
export class AppModule {
}
