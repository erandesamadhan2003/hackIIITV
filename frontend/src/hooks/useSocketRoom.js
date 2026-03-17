import { useCallback, useEffect, useRef, useState } from "react";
import { createSocketClient } from "@/api/socket";

export const useSocketRoom = (roomId, activeFile) => {
    const socketRef = useRef(null);
    const activeFileRef = useRef(activeFile);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        activeFileRef.current = activeFile;
    }, [activeFile]);

    useEffect(() => {
        if (!roomId) return;

        const socket = createSocketClient();
        socketRef.current = socket;

        socket.emit("joinRoom", roomId);

        const handlePreviousMessages = (oldMessages) => {
            setMessages(oldMessages || []);
        };

        const handleIncomingMessage = (newMessage) => {
            setMessages((prev) => [...prev, newMessage]);
        };

        socket.on("previousMessages", handlePreviousMessages);
        socket.on("receivedmessage", handleIncomingMessage);

        return () => {
            socket.off("previousMessages", handlePreviousMessages);
            socket.off("receivedmessage", handleIncomingMessage);
            socket.disconnect();
        };
    }, [roomId]);

    const sendMessage = useCallback((payload) => {
        socketRef.current?.emit("send_message", payload);
    }, []);

    const emitCodeUpdate = useCallback((newCode) => {
        socketRef.current?.emit("codeUpdate", {
            roomId,
            newCode,
            activeFile: activeFileRef.current,
        });
    }, [roomId]);

    const listenCodeUpdates = useCallback((onCodeChange) => {
        const socket = socketRef.current;
        if (!socket) return () => { };

        const handler = (newCode, incomingFile) => {
            if (activeFileRef.current === incomingFile) {
                onCodeChange(newCode);
            }
        };

        socket.on("changeCode", handler);

        return () => {
            socket.off("changeCode", handler);
        };
    }, []);

    return {
        messages,
        sendMessage,
        emitCodeUpdate,
        listenCodeUpdates,
    };
};
