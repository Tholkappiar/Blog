import useAuth from "./useAuth";
import { API_ROUTES } from "../utils/apiEndpoints";
import axios from "axios";

const useRefreshToken = () => {
    const { setUser, setPersist } = useAuth();

    const refresh = async () => {
        try {
            const refreshAxios = axios.create({
                baseURL: API_ROUTES.BASE_URL,
                withCredentials: true,
            });
            const { data } = await refreshAxios.get(API_ROUTES.REFRESH_TOKEN);
            setUser({ token: data.token, userId: data.userId });
            console.log("New token:", data.token);
            return data.token;
        } catch (error) {
            console.error("Error refreshing token:", error);
            setUser({ token: "", userId: "" });
            setPersist(false);
            throw new Error("Refresh token expired or invalid");
        }
    };

    return refresh;
};

export default useRefreshToken;
