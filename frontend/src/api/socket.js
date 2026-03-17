import { io } from "socket.io-client";

export const createSocketClient = () => {
    return io({
        path: "/api/socket.io",
        withCredentials: true,
    });
};
