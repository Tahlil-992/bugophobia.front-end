export const resetLocalStorage = async () => {
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("refreshToken");
}

export const setLocalStorage = async ({ accessToken, refreshToken }) => {
    await localStorage.setItem("accessToken", accessToken);
    await localStorage.setItem("refreshToken", refreshToken);
}