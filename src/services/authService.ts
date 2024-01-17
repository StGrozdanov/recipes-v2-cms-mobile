import { useMutation } from "react-query";
import { BASE_URL, LoginData, User } from "./types";
import { useCallback } from "react";
import { useRequestHandler } from "../hooks/useRequestHandler";

/**
 * hook to handle all auth related requests
 * @returns handler functions
 */
export const useAuthService = () => {
    const { POST } = useRequestHandler();

    const useLogin = () => {
        const {
            mutateAsync: loginMutation,
            isLoading,
            isError,
        } = useMutation((data: LoginData) => {
            const response: Promise<User> = POST(`${BASE_URL}/auth/login`, data);
            return response;
        });

        const login = useCallback(async (data: LoginData) => {
            try {
                const loginResponse = loginMutation(data);
                return { loginResponse };
            } catch (error) {
                return { error };
            }
        }, [loginMutation]);

        return { login, isLoading, isError };
    };

    return {
        useLogin,
    }
}

/**
 * Checks if the provided username is already registered in the server
 */
export const usernameIsAvailableRequest = async (username: string): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/auth/check-username`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`status: ${response.status}, message: ${data.error}`);
    }
    return data;
}

/**
 * Checks if the provided email is already registered in the server
 */
export const emailIsAvailableRequest = async (email: string): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}/auth/check-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`status: ${response.status}, message: ${data.error}`);
    }
    return data;
}