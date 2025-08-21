import React from "react";
import { useAuthContext } from "../contexts/Auth.Context"
import { Outlet, useNavigate } from "react-router-dom";

export const RequireAuth = () => {
    const { token } = useAuthContext();
    const navigate = useNavigate();

    React.useEffect(() => {
        if(!token) {
            navigate("/login");
        }
    }, [token])

    return(
        <>
            <Outlet/>
        </>
    ) 
}