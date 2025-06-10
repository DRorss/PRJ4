import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem("infoUser"));

    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
