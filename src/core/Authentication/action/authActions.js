import { LOGIN, STORE_ACCESS_TOKEN } from "./actionTypes";

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
})