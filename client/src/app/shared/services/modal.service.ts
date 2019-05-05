import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ErrorModalState, ModalState } from '../models/modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  loginState$ = new Subject<ModalState>();
  registerState$ = new Subject<ModalState>();
  errorState$ = new Subject<ErrorModalState>();

  constructor() { }

  showError(message: string, time: number) {
    this.errorState$.next({ open: true, message });
    setTimeout(() => this.errorState$.next({ open: false, message: null }), time);
  }
}
