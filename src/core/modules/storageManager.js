export const resetLocalStorage = async () => {
    await localStorage.removeItem("accessToken");
    await localStorage.removeItem("refreshToken");
    await localStorage.removeItem("email");
    await localStorage.removeItem("isdoctor");
}

export const setLocalStorage = async (obj) => {
    const keys = Object.keys(obj);
    keys.forEach(async (fieldName) => {
        await localStorage.setItem(fieldName, obj[fieldName]);
    });
}

export const getLocalStorage = async () => {
    const accessToken = await localStorage.getItem("accessToken");
    const refreshToken = await localStorage.getItem("refreshToken");
    const email = await localStorage.getItem("email");
    const isdoctor = await localStorage.getItem("isdoctor");
    return { accessToken, refreshToken, email, isdoctor };
}

export const resetSessionStorage = async () => {
    await sessionStorage.removeItem("accessToken");
    await sessionStorage.removeItem("refreshToken");
    await sessionStorage.removeItem("email");
    await sessionStorage.removeItem("isdoctor");
}

export const setSessionStorage = async (obj) => {
    const keys = Object.keys(obj);
    keys.forEach(async (fieldName) => {
        await sessionStorage.setItem(fieldName, obj[fieldName]);
    });
}

export const getSessionStorage = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const email = sessionStorage.getItem("email");
    const isdoctor = sessionStorage.getItem("isdoctor");
    return { accessToken, refreshToken, email, isdoctor };
}