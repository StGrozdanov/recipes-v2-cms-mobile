import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/services/types";

type UserLocalStorageProps = {
    key: string,
    defaultValue: User,
}

/**
 * Hook that gives acces to the user local storage
 */
export function useUserLocalStorage({ key, defaultValue }: UserLocalStorageProps) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        (async () => {
            const userData = await AsyncStorage.getItem(key);
            const storedData: User = userData !== null ? JSON.parse(userData) : defaultValue;
            setValue(storedData);
        })()
    }, [key]);

    const setUserLocalStorageValue = async (newValue: User) => {
        if (newValue) {
            await AsyncStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        }
    }

    const clearLocalStorage = async () => await AsyncStorage.removeItem(key);

    const updateLocalStorageValues = async (username: string, email: string) => {
        const oldData = await AsyncStorage.getItem(key);

        if (oldData) {
            const parsedData = JSON.parse(oldData);
            const updatedData = { ...parsedData, username, email }
            await AsyncStorage.setItem(key, JSON.stringify(updatedData));
        }
    }

    return {
        user: value,
        setUserLocalStorageValue,
        clearLocalStorage,
        updateLocalStorageValues,
    }
}