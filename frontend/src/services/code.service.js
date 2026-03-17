import { apiClient } from "@/api/client";

export const codeService = {
    async executeCode(payload) {
        const { data } = await apiClient.post("/code/execute", payload);
        return data;
    },
};
