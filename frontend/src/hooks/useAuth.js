import { useEffect, useMemo, useState } from "react";
import { authService } from "@/services/auth.service";
import { tokenService } from "@/services/token.service";

export const useAuth = () => {
    const [token, setToken] = useState(tokenService.getToken());

    useEffect(() => {
        return tokenService.onTokenChange(() => {
            setToken(tokenService.getToken());
        });
    }, []);

    const user = useMemo(() => tokenService.decodeToken(token), [token]);

    const login = async (credentials) => {
        const data = await authService.login(credentials);
        if (data?.token) tokenService.setToken(data.token);
        return data;
    };

    const signup = async (payload) => {
        const data = await authService.signup(payload);
        if (data?.token) tokenService.setToken(data.token);
        return data;
    };

    const logout = () => {
        tokenService.clearToken();
    };

    return {
        token,
        user,
        isAuthenticated: Boolean(token),
        login,
        signup,
        logout,
    };
};
