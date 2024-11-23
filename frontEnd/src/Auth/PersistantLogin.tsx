import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";

const PersistantLogin = () => {
    const { user, persist } = useAuth();
    const refresh = useRefreshToken();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getAccessToken = async () => {
            if (!user?.token && persist) {
                await refresh();
            }
            setIsLoading(false);
        };

        getAccessToken();
    }, [user?.token, persist, refresh]);

    if (!persist) {
        return <Outlet />;
    }

    return isLoading ? <p>Loading....</p> : <Outlet />;
};

export default PersistantLogin;
