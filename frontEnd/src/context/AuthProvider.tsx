import React, { createContext, ReactNode, useState } from "react";

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
    const [user, setUser] = useState<User>({ token: "" });
    const [persist, setPersist] = useState<boolean>(
        (localStorage.getItem("persist") || false) === "true"
    );

    return (
        <AuthContext.Provider value={{ user, setUser, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
