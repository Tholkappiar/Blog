import useAuth from "./useAuth";
import { axiosPrivate } from "../utils/axiosInstance";
import { API_ROUTES } from "../utils/apiEndpoints";

const useRefreshToken = () => {
    const { setUser } = useAuth();

    const refresh = async () => {
        try {
            const { data } = await axiosPrivate.get(API_ROUTES.REFRESH_TOKEN);
            setUser({ token: data.token, userId: data.userId });
            console.log(data.userId);
            return data.token;
        } catch (error) {
            console.error("Error refreshing token", error);
            setUser({ token: "" });
            throw error;
        }
    };

    return refresh;
};

export default useRefreshToken;
