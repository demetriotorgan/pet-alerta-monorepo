import { createContext, useContext, useEffect, useState } from "react";
import { authMe, loginUsuario } from "../api/authApi";
import { hasToken, removeToken, setToken } from "../services/tokenService";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (email, senha) => {
        const data = await loginUsuario(email, senha);
        setToken(data.token);
        setUser(data.user);
        return data.user
    };

    const logout = () => {
        removeToken();
        setUser(null);
    };

    const restoreSession = async () => {
        if(!hasToken()){
            setLoading(false);
            return
        }
        
        try {
            const user = await authMe();
            setUser(user);   
        } catch (error) {
            removeToken();
            setUser(null);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        restoreSession();
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        restoreSession
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

