import { STORAGE_KEYS } from "@/constants/storageKeys";

const AUTH_EVENT = "auth:token-changed";

const emitAuthChange = () => {
    window.dispatchEvent(new Event(AUTH_EVENT));
};

export const tokenService = {
    getToken() {
        return localStorage.getItem(STORAGE_KEYS.TOKEN);
    },

    setToken(token) {
        localStorage.setItem(STORAGE_KEYS.TOKEN, token);
        emitAuthChange();
    },

    clearToken() {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        emitAuthChange();
    },

    decodeToken(token = this.getToken()) {
        if (!token) return null;

        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (error) {
            return null;
        }
    },

    onTokenChange(callback) {
        window.addEventListener(AUTH_EVENT, callback);
        window.addEventListener("storage", callback);

        return () => {
            window.removeEventListener(AUTH_EVENT, callback);
            window.removeEventListener("storage", callback);
        };
    },
};
