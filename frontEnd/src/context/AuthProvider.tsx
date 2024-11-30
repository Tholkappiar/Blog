import React, { createContext, ReactNode, useState, useEffect } from "react";

interface AuthProviderType {
    children: ReactNode;
}

interface User {
    token?: string;
}

interface AuthContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    persist: boolean;
    setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
    const [user, setUser] = useState<User>({
        token: localStorage.getItem("accessToken") || "",
    });
    const [persist, setPersist] = useState<boolean>(
        (localStorage.getItem("persist") || "false") === "true"
    );

    useEffect(() => {
        if (user.token) {
            console.log("Token from AuthProvider:", user.token);
        }
    }, [user.token]);

    useEffect(() => {
        if (user.token && persist) {
            localStorage.setItem("accessToken", user.token);
        } else {
            localStorage.removeItem("accessToken");
        }
    }, [user.token, persist]);

    return (
        <AuthContext.Provider value={{ user, setUser, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
