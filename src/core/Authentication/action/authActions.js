import { LOGIN, REMEMBER_ME, SIGNOUT, SET_ISDOCTOR } from "./actionTypes";

export const login = userData => ({
    type: LOGIN,
    payload: {
        token: {
            access: userData.accessToken,
            refresh: userData.refreshToken,
        },
        email: userData.email,
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

export function setIsDoctor (state) {
    return {
        type : SET_ISDOCTOR,
        payload: { isdoctor: state },
    };
}