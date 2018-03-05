import { Action } from '@ngrx/store';

export const CHECK_AUTH_STATE = 'CHECK_AUTH_STATE';
export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ADMIN = 'SET_ADMIN';
export const SET_GUEST = 'SET_GUEST';
export const SET_CURRENT_USERNAME = 'SET_CURRENT_USERNAME';
export const SET_USER_ID = 'SET_USER_ID';
export const TRY_SELF_CHECK = 'TRY_SELF_CHECK';
export const SELF_CHECK = 'SELF_CHECK';

export class CheckAuthState implements Action {
  readonly type = CHECK_AUTH_STATE;

  constructor(public payload: string){}
}

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: { username: string, name: string, password: string }) {
  }
}

export class TrySignin implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { username: string, password: string }) {
  }
}

export class Signup implements Action {
  readonly type = SIGNUP;
}

export class Signin implements Action {
  readonly type = SIGNIN;

  constructor(public payload: boolean) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: string) { }
}

export class SetAdmin implements Action {
  readonly type = SET_ADMIN;

  constructor(public payload: boolean) { }
}

export class SetGuest implements Action {
  readonly type = SET_GUEST;

  constructor(public payload: boolean) { }
}

export class SetCurrentUsername implements Action {
  readonly type = SET_CURRENT_USERNAME;

  constructor(public payload: string) { }
}

export class SetUserId implements Action {
  readonly type = SET_USER_ID;

  constructor(public payload: string) { }
}

export class TrySelfCheck implements Action {
  readonly type= "TRY_SELF_CHECK";
}

export class SelfCheck implements Action {
  readonly type= "SELF_CHECK";
  constructor(public payload:boolean){}
}

export type AuthActions = 
  CheckAuthState|
  Signup |
  Signin |
  Logout |
  SetToken |
  TrySignup |
  TrySignin |
  SetAdmin |
  SetGuest |
  SetCurrentUsername|
  SetUserId|
  TrySelfCheck|
  SelfCheck;
