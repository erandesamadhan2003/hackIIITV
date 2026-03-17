import { useEffect, useState } from "react";
import { userService } from "@/services/user.service";
import { getApiErrorMessage } from "@/api/client";
import { useAuth } from "@/hooks/useAuth";

export const useCurrentUser = () => {
    const { user: tokenUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (!tokenUser?.id) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");
                const data = await userService.getUserById(tokenUser.id);
                setUser(data);
            } catch (err) {
                setError(getApiErrorMessage(err, "Failed to fetch user details"));
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, [tokenUser?.id]);

    return { user, loading, error };
};
