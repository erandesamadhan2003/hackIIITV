import { apiClient } from "@/api/client";

export const fileService = {
    async uploadFile(payload) {
        const { data } = await apiClient.post("/rooms/file/upload", payload);
        return data;
    },

    async getFiles(roomId) {
        const { data } = await apiClient.get(`/rooms/file/get/${roomId}`);
        return data;
    },

    async getFileById(fileId) {
        const { data } = await apiClient.get(`/rooms/file/specificFile/${fileId}`);
        return data;
    },

    async createFile(payload) {
        const { data } = await apiClient.post("/rooms/file/create", payload);
        return data;
    },

    async updateFile(fileId, content) {
        const { data } = await apiClient.put(`/rooms/file/update/${fileId}`, { content });
        return data;
    },

    async deleteFile(fileId) {
        const { data } = await apiClient.delete(`/rooms/file/delete/${fileId}`);
        return data;
    },
};
