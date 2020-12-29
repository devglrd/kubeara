import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {ActivatedRoute, Event, NavigationEnd, Router} from '@angular/router';
import {isPlatformBrowser} from '@angular/common';
import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {AuthService} from '../../modules/shared/services';

declare var window: any;
window.dataLayer = window.dataLayer || [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly isBrowser: boolean;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(@Inject(PLATFORM_ID) private platformId,
              private router: Router,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  customEvent() {
  }

}
