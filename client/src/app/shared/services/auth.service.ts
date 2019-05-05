import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../models/user.model';
import UserCredentials from '../models/user-credentials.model';
import { ModalService } from './modal.service';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { UserLoginFail, UserRegisterFail, UserUpdate } from '../state/actions/user.actions';
import ProductSearch from '../models/product-search.model';
import { EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private modalService: ModalService,
              private store: Store<State>) { }

  tryLogin() {
    const credentials = this.getCredentials();

    if (!credentials) {
      return;
    }

    this.store.dispatch(new UserUpdate(credentials.user));
  }

  register(user: User) {
    this.modalService.registerState$.next({ open: false });
    this.http.post<UserCredentials>('http://localhost:8000/users', user).subscribe(
        credentials => {
          this.setCredentials(credentials);
          this.store.dispatch(new UserUpdate(credentials.user));
        },
        () => {
          this.store.dispatch(new UserRegisterFail());
        }
    );
  }

  getCredentials(): UserCredentials {
    return JSON.parse(localStorage.getItem('credentials'));
  }

  setCredentials(value) {
    localStorage.setItem('credentials', JSON.stringify(value));
  }

  login(user: User) {
    const encodedCredentials = btoa(`${user.username}:${user.password}`);
    this.modalService.loginState$.next({ open: false });

    this.http.get('http://localhost:8000/access-token', { headers: {
      Authorization: 'Basic ' + encodedCredentials
    }}).subscribe((credentials: UserCredentials) => {
      this.setCredentials(credentials);
      this.store.dispatch(new UserUpdate(credentials.user));
    }, () => {
      this.store.dispatch(new UserLoginFail());
    });
  }

  logout() {
    localStorage.clear();
  }

  getHistory() {
    if (!this.getCredentials()) {
      return EMPTY;
    }

    return this.http.get<ProductSearch>('http://localhost:8000/history');
  }

}
