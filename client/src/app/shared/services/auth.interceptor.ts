import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { State } from '../state';
import { Store } from '@ngrx/store';
import { UserExpire } from '../state/actions/user.actions';

@Injectable()
export default class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private store: Store<State>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.getCredentials() && this.authService.getCredentials().exp <= new Date().getTime() / 1000) {
            debugger
            this.store.dispatch(new UserExpire());
            return;
        }

        if (req.url.includes('/access-token')) {
            return next.handle(req);
        }

        let clone = req.clone();

        if (this.authService.getCredentials() && this.authService.getCredentials().token) {
            clone = clone.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + this.authService.getCredentials().token
                }
            });
        }
        return next.handle(clone);
    }

}
