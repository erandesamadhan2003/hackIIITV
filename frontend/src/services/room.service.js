import { apiClient } from "@/api/client";

export const roomService = {
    async createRoom(payload) {
        const { data } = await apiClient.post("/rooms", payload);
        return data;
    },

    async joinRoom(roomId, userId) {
        const { data } = await apiClient.post(`/rooms/join/${roomId}`, { userId });
        return data;
    },

    async getRoomDetails(roomId) {
        const { data } = await apiClient.get(`/rooms/get/${roomId}`);
        return data;
    },

    async getJoinedRooms(userId) {
        const { data } = await apiClient.get(`/rooms/getrooms/${userId}`);
        return data;
    },
};
