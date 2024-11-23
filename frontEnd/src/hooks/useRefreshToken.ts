import useAuth from "./useAuth";
import { axiosPrivate } from "../utils/axiosInstance";
import { API_ROUTES } from "../utils/apiEndpoints";

const useRefreshToken = () => {
    const { user, setUser } = useAuth();

    const refresh = async () => {
        const { data } = await axiosPrivate.get(API_ROUTES.REFRESH_TOKEN);
        setUser({ token: data.token });
        console.log(user);
        return data.token;
    };

    return refresh;
};

export default useRefreshToken;
