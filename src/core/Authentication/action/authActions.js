import { SIGNOUT } from "../../Login/action/actionTypes";
import { LOGIN, REMEMBER_ME, STORE_ACCESS_TOKEN } from "./actionTypes";

export const login = userData => ({
    type: LOGIN,
    payload: {
        token: {
            access: userData.accessToken,
            refresh: userData.refreshToken,
        },
        username: userData.username,
        email: userData.email,
    }
});

export const storeAccessToken = accessToken => ({
    type: STORE_ACCESS_TOKEN,
    payload: {
        token: {
            access: accessToken,
        }
    }
});

export const signOut = () => ({
    type: SIGNOUT,
    payload: null,
});

export const rememberMe = () => ({
    type: REMEMBER_ME,
    payload: null,
});