import axios from "axios";
import toast from "react-hot-toast";

export const TOKEN_KEY =
    "marketplace_token";

const baseURL =
    import.meta.env
        .VITE_API_BASE_URL ||
    "http://localhost:5000/api";

const axiosClient =
    axios.create({
        baseURL,
        timeout: 20000,

        headers: {
            "Content-Type":
                "application/json",
        },
    });

axiosClient.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem(
                TOKEN_KEY
            );

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);

axiosClient.interceptors.response.use(
    (response) => response,

    (error) => {
        const status =
            error.response?.status;

        const message =
            error.response?.data
                ?.message ||
            error.message ||
            "Network error";

        if (status === 401) {
            localStorage.removeItem(
                TOKEN_KEY
            );

            if (
                !window.location.pathname.startsWith(
                    "/login"
                )
            ) {
                toast.error(
                    "Session expired. Please log in."
                );

                window.location.href =
                    "/login";
            }
        } else if (
            status &&
            status >= 500
        ) {
            toast.error(
                "Server error. Please try again later."
            );
        } else if (
            !error.response
        ) {

        }

        return Promise.reject({
            status,
            message,
            raw: error,
        });
    }
);

export default axiosClient;