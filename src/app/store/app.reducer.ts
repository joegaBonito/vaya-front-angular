import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../components/login/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer
};
