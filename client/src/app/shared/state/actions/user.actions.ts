import { Action } from '@ngrx/store';
import User from '../../models/user.model';

export enum UserTypes {
    Login = '[User] Login',
    Register = '[User] Register',
    Logout = '[User] Logout',
    Update = '[User] Update',
    Expire = '[User] Expire',
    LoginFail = '[User] Login Fail',
    RegisterFail = '[User] Register Fail',
}

export class UserLogin implements Action {
    readonly type = UserTypes.Login;

    constructor(public payload: User) { }
}

export class UserRegister implements Action {
    readonly type = UserTypes.Register;

    constructor(public payload: User) { }
}

export class UserLogout implements Action {
    readonly type = UserTypes.Logout;
}

export class UserLoginFail implements Action {
    readonly type = UserTypes.LoginFail;
}

export class UserRegisterFail implements Action {
    readonly type = UserTypes.RegisterFail;
}

export class UserUpdate implements Action {
    readonly type = UserTypes.Update;

    constructor(public payload: User) { }
}

export class UserExpire implements Action {
    readonly type = UserTypes.Expire;
}

export type UserActions = UserLogin | UserLogout | UserUpdate | UserLoginFail | UserExpire;
