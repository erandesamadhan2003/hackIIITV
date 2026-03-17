import { apiClient } from "@/api/client";

export const authService = {
    async login(payload) {
        const { data } = await apiClient.post("/auth/login", payload);
        return data;
    },

    async signup(payload) {
        const { data } = await apiClient.post("/auth/signup", payload);
        return data;
    },
};
