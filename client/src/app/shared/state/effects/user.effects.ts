import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserLogout, UserTypes } from '../actions/user.actions';
import { AuthService } from '../../services/auth.service';
import { mapTo, tap } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
    @Effect({dispatch: false})
    login$ = this.actions$.pipe(
        ofType(UserTypes.Login),
        tap((action: any) => {
            this.authService.login(action.payload);
        })
    );

    @Effect({dispatch: false})
    register$ = this.actions$.pipe(
        ofType(UserTypes.Register),
        tap((action: any) => {
            this.authService.register(action.payload);
        })
    );

    @Effect({dispatch: false})
    logout$ = this.actions$.pipe(
        ofType(UserTypes.Logout),
        tap(() => {
            this.router.navigate(['']);
            this.authService.logout();
        })
    );

    @Effect({dispatch: false})
    loginFail$ = this.actions$.pipe(
        ofType(UserTypes.LoginFail),
        tap(() => this.modalService.showError('Autentificare esuata! Numele sau parola sunt incorecte.', 2500))
    );

    @Effect({dispatch: false})
    registerFail$ = this.actions$.pipe(
        ofType(UserTypes.RegisterFail),
        tap(() => this.modalService.showError('Inregistrarea a esuat!', 2500))
    );

    @Effect()
    userExpire$ = this.actions$.pipe(
        ofType(UserTypes.Expire),
        tap(() => this.modalService.showError('Sesiunea a expirat!', 2500)),
        mapTo(new UserLogout())
    );

    constructor(public actions$: Actions,
                private router: Router,
                private authService: AuthService,
                private modalService: ModalService) {}
}
