import { apiClient } from "@/api/client";

export const userService = {
    async getUserById(userId) {
        const { data } = await apiClient.get(`/auth/user/${userId}`);
        return data;
    },
};
