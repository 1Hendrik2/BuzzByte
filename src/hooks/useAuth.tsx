import { createContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken, clearUser } from "../redux/user/user.slice";
import { RootState } from "../redux/store";

type UserContextType = {
    user: User | null;
    token: string | null;
    loginUser: (email: string, token: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children } : Props) => {
    const navigate = useNavigate();
    // const [token, setToken] = useState<string | null>(null);
    // const [user, setUser] = useState<User | null>(null);
    const token = useSelector((state: RootState) => state.user.token); 
    const user = useSelector((state: RootState) => state.user);
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("token");
        if(user && token) {
            dispatch(setUser(JSON.parse(user)));
            dispatch(setToken(token));
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        setIsReady(true);
    }, [dispatch]);

    const loginUser = async (email: string, token: string) => {
        await loginAPI(token).then((res) => {
            if(res) {
                sessionStorage.setItem("token", token);
                const userObj = {
                    email: email,
                    token: token
                }
                sessionStorage.setItem("user", JSON.stringify(userObj));
                sessionStorage.setItem("language", "en");
                dispatch(setToken(token!));
                dispatch(setUser(userObj!));
                toast.success("Login Success!");
                navigate("/");
            }
        }).catch((e) => toast.warning("Login error occured"));
    };

    const isLoggedIn = (): boolean => {
        return !!sessionStorage.getItem('token');
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        dispatch(clearUser());
        setToken("");
        navigate("/");
        toast.success("You have successfully logged out.");
    };

    return (
        <UserContext.Provider value={{loginUser, user, token, logout, isLoggedIn,}}>{isReady ? children : null}</UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);