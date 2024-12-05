import axiosInstance from "@/utils/axiosInstance";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useAxiosInstance = () => {
    const { user } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const axiosInstanceToUse = user.token ? axiosPrivate : axiosInstance;
    return axiosInstanceToUse;
};

export default useAxiosInstance;
