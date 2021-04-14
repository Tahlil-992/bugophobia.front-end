import { LOGIN, SIGNOUT, REMEMBER_ME, SET_ISDOCTOR } from "../action/actionTypes";

const initialstate = {
  authData: {
    token: {
      access: null,
      refresh: null,
    },
    email: null,
    remember_me: false,
  },
  isdoctor: false,
}

export const authReducer = (currentState = initialstate, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...currentState,
        authData: {
          ...action.payload,
          remember_me: false,
        },
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
      };
    case SET_ISDOCTOR:
      return {
        ...currentState,
        isdoctor: true,
      }
    default: return currentState;
  }
}