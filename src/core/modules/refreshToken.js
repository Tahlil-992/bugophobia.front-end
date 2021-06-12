import { resetLocalStorage, resetSessionStorage } from "./storageManager";
import axios from "axios";

const callAPI = async (request, sendToken = true) => {
    const accessToken = await (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"));
    const authorization = sendToken && { "Authorization": `Bearer ${accessToken}` };
    // console.log(request.data);
    // console.log("n\n" + request.data || {})
    try {
        console.log("PROCESS\n", process)
        const response = await axios({
            url: request.url,
            method: request.method,
            baseURL: request.baseURL || process.env.REACT_APP_DOMAIN,
            headers: {
                ...request.headers,
                ...authorization,
                "Content-Type": "application/json",

            },
            data: request.data || {},
            params: request.params || {},
        })
        return {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            payload: response.data,
        };
    }
    catch (e) {
        const error = e.response
        const { status = '', statusText = '', headers = {}, data = null } = error;
        const result = {
            status,
            statusText,
            headers,
            payload: data,
        };
        throw result;
    }
}

export const callAPIHandler = async (request, sendToken, isRemembered) => {
    try {
        const response = callAPI(request, sendToken);
        return response;
    }
    catch (e) {
        if (e.status === 401) {
            console.log("access expired");
            try {
                const refreshRequest = { url: "/auth/token/refresh/", method: "POST" };
                const refreshResponse = callAPI(refreshRequest, true);
                if (refreshResponse.status === 200) {
                    if (isRemembered) {
                        await localStorage.setItem("accessToken");
                    }
                    else {
                        await sessionStorage.setItem("accessToken");
                    }
                }
                const retryResponse = callAPI(request);
                return retryResponse;
            }
            catch (e) {
                if (e.status === 401) {
                    console.log("refresh expired");
                    if (isRemembered) {
                        await resetLocalStorage();
                    }
                    else {
                        await resetSessionStorage();
                    }
                    // location.replace("http://localhost:3000/");
                }
                else {
                    console.log("refresh not expired");
                    throw e;
                }
            }
        }
        else {
            console.log("access not expired");
        }

    }
}