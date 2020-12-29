import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

import {AuthService} from '../../../shared/services';
import {Meta} from '@angular/platform-browser';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss']
})
export class WebsiteComponent implements OnInit, OnDestroy {

  public isAuth: boolean;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private meta: Meta) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}

