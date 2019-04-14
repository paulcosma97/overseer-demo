import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import User from '../models/user.model';
import { ModalService } from '../services/modal.service';
import { select, Store } from '@ngrx/store';
import { State } from '../state';
import { UserLogout } from '../state/actions/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private store: Store<State>,
              private modalService: ModalService) { }

  ngOnInit() {
    this.store.pipe(select(state => state.user)).subscribe(state => {
      this.user = state.user;
    });
  }

  logout() {
    this.store.dispatch(new UserLogout());
  }

  showLogin() {
    this.modalService.loginState$.next({
      open: true
    });
  }

}
