import { createContext } from "react";
import { useUserLocalStorage } from "../hooks/useLocalStorage";
import { User } from "../services/types";
import { ContainerProps } from "./types";

type AuthContextType = {
    isAuthenticated: boolean,
    token: string,
    userLogin: (loginData: User) => Promise<void>,
    userLogout: () => Promise<void>,
    avatar: string,
    username: string,
    email: string,
    userId: number,
}

const defaultUserValues: User = {
    username: "",
    avatarURL: '',
    coverPhotoURL: null,
    email: "",
    sessionToken: "",
    id: 0,
    avatar: '',
    isAdministrator: false,
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    token: '',
    userLogin: (_loginData: User) => Promise.resolve(console.info('nothing here yet.')),
    userLogout: () => Promise.resolve(console.info('nothing here yet.')),
    avatar: '',
    username: '',
    email: '',
    userId: 0,
});

export const AuthProvider = ({ children }: ContainerProps) => {
    const {
        user,
        setUserLocalStorageValue,
        clearLocalStorage,
    } = useUserLocalStorage({
        key: 'user',
        defaultValue: defaultUserValues
    });

    const userLogin = async (userData: User) => await setUserLocalStorageValue(userData);

    const userLogout = async () => {
        await Promise.all([
            clearLocalStorage(),
            setUserLocalStorageValue(defaultUserValues),
        ])
    };

    const isAuthenticated = user.sessionToken !== '';

    const token = user.sessionToken;

    const avatar = user.avatarURL;

    const username = user.username;

    const email = user.email;

    const userId = user.id;

    return (
        <AuthContext.Provider value={{
            userLogin,
            userLogout,
            isAuthenticated,
            token,
            avatar,
            username,
            email,
            userId,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
