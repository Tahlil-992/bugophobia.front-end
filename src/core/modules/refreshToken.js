import { resetLocalStorage, resetSessionStorage } from "./storageManager";
import axios from "axios";

const callAPI = async (request, sendToken = true) => {
    const accessToken = await (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"));
    const authorization = sendToken && { "Authorization": `Bearer ${accessToken}` };
    try {
        const response = await axios({
            url: request.url,
            method: request.method,
            baseURL: request.baseURL || "http://localhost:8000",
            headers: {
                ...request.headers,
                ...authorization,
                "Content-Type": "application/json",

            },
            data: ["PUT", "POST"].includes(request.method) ? request.data : {},
            params: ["DELETE", "GET"].includes(request.method) ? request.params : {},
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
                    if (isRemembered) {
                        await resetLocalStorage();
                    }
                    else {
                        await resetSessionStorage();
                    }
                    // location.replace("http://localhost:3000/");
                }
                else {
                    throw e;
                }
            }
        }

    }
}