import * as AuthActions from './auth.action';

export interface State {
  token: string;
  authenticated: boolean;
  isAdmin: boolean;
  currentUsername: string;
  userId:string;
  isSelf: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false,
  isAdmin: false,
  currentUsername: null,
  userId:null,
  isSelf: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP):
      return {
        ...state
      }
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: action.payload
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false,
        isAdmin: false,
        currentUsername: null,
        userId:null,
        isSelf: false
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    case (AuthActions.SET_ADMIN):
      return {
        ...state,
        isAdmin: action.payload
      };
    case (AuthActions.SET_CURRENT_USERNAME):
      return {
        ...state,
        currentUsername: action.payload
      }
    case (AuthActions.SET_USER_ID):
      return {
        ...state,
        userId: action.payload
      }
    case (AuthActions.SELF_CHECK):
      return {
        ...state,
        isSelf: action.payload
      }
    default:
      return state;
  }
}
