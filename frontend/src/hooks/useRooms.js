import { useCallback, useEffect, useState } from "react";
import { roomService } from "@/services/room.service";
import { getApiErrorMessage } from "@/api/client";

export const useRooms = (userId) => {
    const [rooms, setRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(false);
    const [error, setError] = useState("");

    const refreshRooms = useCallback(async () => {
        if (!userId) return;

        try {
            setLoadingRooms(true);
            setError("");
            const data = await roomService.getJoinedRooms(userId);
            setRooms(data?.rooms || []);
        } catch (err) {
            setError(getApiErrorMessage(err, "Failed to fetch rooms"));
        } finally {
            setLoadingRooms(false);
        }
    }, [userId]);

    useEffect(() => {
        refreshRooms();
    }, [refreshRooms]);

    return {
        rooms,
        loadingRooms,
        error,
        refreshRooms,
    };
};
