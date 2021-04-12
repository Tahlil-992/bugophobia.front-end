import { LOGIN, SIGNOUT, REMEMBER_ME } from "../action/actionTypes";

const initialstate = {
  token: {
    access: null,
    refresh: null,
  },
  email: null,
  remember_me: false,
}

export const authReducer = (currentState = { authData: initialstate }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...currentState,
        authData: action.payload,
      };
    case SIGNOUT:
      return {
        ...currentState,
        authData: initialstate,
      };
    case REMEMBER_ME:
      return {
        ...currentState,
        authData: {
          ...currentState.authData,
          remember_me: true,
        }
      }
    default: return currentState;
  }
}