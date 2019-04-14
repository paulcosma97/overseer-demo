import { ActionReducerMap } from '@ngrx/store';
import { State } from '../index';
import { userReducer } from './user.reducer';


export const reducers: ActionReducerMap<State, any> = {
  user: userReducer
};
