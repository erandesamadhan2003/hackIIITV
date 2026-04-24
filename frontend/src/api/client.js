import axios from "axios";
import { tokenService } from "@/services/token.service";

export const apiClient = axios.create({
    baseURL: "https://hackiiitv.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = tokenService.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export const getApiErrorMessage = (error, fallbackMessage = "Something went wrong") => {
    return (
        error?.response?.data?.message ||
        error?.message ||
        fallbackMessage
    );
};
