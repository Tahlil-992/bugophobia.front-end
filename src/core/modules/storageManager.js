export const resetLocalStorage = async () => {
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("refreshToken");
    await localStorage.removeItem("email");
}

export const setLocalStorage = async ({ accessToken, refreshToken, email }) => {
    await localStorage.setItem("accessToken", accessToken);
    await localStorage.setItem("refreshToken", refreshToken);
    await localStorage.setItem("email", email);
}

export const resetSessionStorage = async () => {
    await sessionStorage.removeItem("accessToken");
    await sessionStorage.removeItem("refreshToken");
    await sessionStorage.removeItem("email");
}

export const setSessionStorage = async ({ accessToken, refreshToken, email }) => {
    await sessionStorage.setItem("accessToken", accessToken);
    await sessionStorage.setItem("refreshToken", refreshToken);
    await sessionStorage.setItem("email", email);
}