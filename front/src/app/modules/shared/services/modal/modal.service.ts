import {Injectable, Type} from '@angular/core';
import {Subject} from 'rxjs';

export interface IModalFactory {
  component: Type<any>;
  data?: any;
}

export interface IModalHost {
  closeModalHandler(): void;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  public loadComponent$: Subject<IModalFactory> = new Subject<IModalFactory>();
  public closeComponent$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  public openModal(modal: IModalFactory) {
    this.loadComponent$.next(modal);
  }

  public closeModal() {
    this.closeComponent$.next(true);
  }

}
