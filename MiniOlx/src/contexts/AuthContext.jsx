import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import toast from "react-hot-toast";

import { authApi } from "../api/authApi";
import { TOKEN_KEY } from "../services/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken =
            localStorage.getItem(TOKEN_KEY);

        if (!storedToken) {
            setIsLoading(false);
            return;
        }

        setToken(storedToken);

        authApi
            .me()
            .then((userData) => {
                setUser(userData);
            })
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY);
                setToken(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const persistAuth = useCallback(
        (userData, authToken) => {
            localStorage.setItem(
                TOKEN_KEY,
                authToken
            );

            setUser(userData);
            setToken(authToken);
        },
        []
    );

    const login = useCallback(
        async (email, password) => {
            const response =
                await authApi.login({
                    email,
                    password,
                });

            persistAuth(
                response.user,
                response.token
            );

            toast.success("Welcome back!");
        },
        [persistAuth]
    );

    const register = useCallback(
        async (
            name,
            email,
            password
        ) => {
            const response =
                await authApi.register({
                    name,
                    email,
                    password,
                });

            persistAuth(
                response.user,
                response.token
            );

            toast.success(
                "Account created"
            );
        },
        [persistAuth]
    );

    const logout = useCallback(
        async () => {
            try {
                await authApi.logout();
            } catch (error) { }

            localStorage.removeItem(
                TOKEN_KEY
            );

            setUser(null);
            setToken(null);

            toast.success(
                "Signed out"
            );
        },
        []
    );

    const refreshUser =
        useCallback(async () => {
            const userData =
                await authApi.me();

            setUser(userData);
        }, []);

    const value = useMemo(
        () => ({
            user,
            token,

            isAuthenticated:
                !!user,

            isLoading,

            login,
            register,
            logout,
            refreshUser,
        }),
        [
            user,
            token,
            isLoading,
            login,
            register,
            logout,
            refreshUser,
        ]
    );

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context =
        useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
}