import User from '../models/user.model';

export interface UserState {
    isLogged: boolean;
    user?: User;
}

export interface State {
    user: UserState;
}
