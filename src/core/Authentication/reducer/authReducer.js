import { LOGIN, SIGNOUT, STORE_ACCESS_TOKEN, REMEMBER_ME } from "../action/actionTypes";

const initialstate = {
  token: {
      access: null,
      refresh: null,
  },
  username: null,
  email: null,
  remember_me: false,
}

export const authReducer = (currentState = initialState, action) => {
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
    case STORE_ACCESS_TOKEN: 
      return {
        ...currentState,
        authData: {
          ...currentState.authData,
          token: {
            ...currentState.authData.token,
            refresh: action.payload.token.access,
          }
        }
      };
    case REMEMBER_ME: 
      return {
        ...currentState,
        authData: {
          ...currentState.authData,
          remember_me: true,
        }
      }
    default: return State;
  }
}