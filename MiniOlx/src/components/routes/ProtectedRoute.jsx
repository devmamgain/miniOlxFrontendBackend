import { Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { Loader } from "../ui/Loader";

export function ProtectedRoute({
    children,
}) {
    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    if (isLoading) {
        return (
            <Loader label="Loading..." />
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return children;
}