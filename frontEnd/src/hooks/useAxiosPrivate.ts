import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { axiosPrivate } from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "@/utils/apiEndpoints";
import { HttpStatusCode } from "axios";

const useAxiosPrivate = () => {
    const { user, setUser } = useAuth();
    const refresh = useRefreshToken();
    const navigate = useNavigate();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${user?.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;

                if (
                    error?.response?.status === HttpStatusCode.Unauthorized &&
                    !prevRequest?.sent &&
                    prevRequest?.url !== API_ROUTES.REFRESH_TOKEN
                ) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers[
                            "Authorization"
                        ] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        console.error(
                            "Refresh token failed, logging out:",
                            refreshError
                        );
                        setUser({ token: "", userId: "" });
                        localStorage.setItem("persist", "false");
                        navigate("/login");
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [user, refresh, navigate, setUser]);

    return axiosPrivate;
};

export default useAxiosPrivate;
