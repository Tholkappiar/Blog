import axios from "axios";
import { API_ROUTES } from "./apiEndpoints";

export default axios.create({
    baseURL: API_ROUTES.BASE_URL,
});

export const axiosPrivate = axios.create({
    baseURL: API_ROUTES.BASE_URL,
    withCredentials: true,
});
