import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { State } from '../state';
import { UserRegister } from '../state/actions/user.actions';

@Component({
  selector: 'app-register',
  template: `
    <div mdbModal class="modal fade left" id="frameModalTop2" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="true">

      <form (ngSubmit)="register()" [formGroup]="registerForm">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center">
              <h4 class="modal-title w-100 font-weight-bold">Inregistrare</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" (click)="hide()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-5">
                <i class="fas fa-envelope prefix grey-text"></i>
                <input type="email" id="registerForm-email" formControlName="username" class="form-control validate"
                       mdbInput>
                <mdb-error *ngIf="controls.username.invalid && (controls.username.dirty || controls.username.touched)">
                  Numele trebuie sa aiba cel putin 3 caractere
                </mdb-error>
                <label data-error="wrong" data-success="right" for="defaultForm-email">Utilizator</label>
              </div>

              <div class="md-form mb-4">
                <i class="fas fa-lock prefix grey-text"></i>
                <input type="password" id="registerForm-pass" formControlName="password" class="form-control validate"
                       mdbInput>
                <mdb-error *ngIf="controls.password.invalid && (controls.password.dirty || controls.password.touched)">
                  Parola trebuie sa aiba cel putin 5 caractere
                </mdb-error>
                <label data-error="wrong" data-success="right" for="defaultForm-pass">Parola</label>
              </div>

            </div>
            <div class="modal-footer d-flex justify-content-center">
              <input type="submit" mdbBtn color="default" class="waves-light" mdbWavesEffect value="Inregistrare" />
            </div>
          </div>
        </div>
      </form>

    </div>
  `,
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  modal: ModalDirective;
  registerForm = new FormGroup({
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
    this.modalService.registerState$.subscribe(state => {
      state.open ? this.modal.show() : this.modal.hide();
    });
  }

  hide() {
    this.modalService.registerState$.next({ open: false });
  }

  get controls(): any {
    return this.registerForm.controls;
  }

  register() {
    if (this.registerForm.invalid) {
      return false;
    }

    this.store.dispatch(new UserRegister({
      username: this.registerForm.controls.username.value,
      password: this.registerForm.controls.password.value
    }));

    this.registerForm.reset();
  }
}
