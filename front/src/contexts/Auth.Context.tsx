import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext<{
    message: string | null;
    token: string | null;
    handleLogin: (email: string, password: string) => Promise<void>;
    handleLogout: () => void;
} | null>(null);

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if(context === null){
        throw new Error("useAuthContext precisa ser utilizado dentro de AuthContextProvider");
    }

    return context;
}

export const AuthContextProvider = ({children}: React.PropsWithChildren) => {
    const [message, setMessage] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token") || null;
    });
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        const response = await fetch("http://localhost:3333/login", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();
        setMessage(data.message);
        setToken(data.token);
        navigate("/")

        if(data.token) localStorage.setItem("token", data.token)
    };

    const handleLogout = () => {
        setToken(null);
        navigate("/login");
    }

    return (
        <AuthContext.Provider value={{message, token, handleLogin, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )
}