import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { UserLogin } from '../state/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  modal: ModalDirective;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor(private modalService: ModalService,
              private authService: AuthService,
              private store: Store<State>) { }

  ngOnInit() {
  }

  @ViewChildren(ModalDirective)
  set modals(list: QueryList<ModalDirective>) {
    this.modal = list.first;
  }

  ngAfterViewInit(): void {
    this.modalService.loginState$.subscribe(state => {
      state.open ? this.modal.show() : this.modal.hide();
    });
  }

  hide() {
    this.modalService.loginState$.next({ open: false });
  }

  get controls() {
    return this.loginForm.controls;
  }

  login() {
    if (this.loginForm.invalid) {
      return false;
    }

    this.store.dispatch(new UserLogin({
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }));

    this.loginForm.reset();
  }

}
