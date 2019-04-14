import { UserState } from '../index';
import { UserActions, UserTypes } from '../actions/user.actions';


export const initialState: UserState = {
    isLogged: false,
    user: null
};

export function userReducer(state = initialState, action: UserActions) {
    switch (action.type) {

        case UserTypes.Update:
            return {
                isLogged: true,
                user: action.payload
            };

        case UserTypes.Logout:
            return initialState;

        default:
            return state;
    }
}
