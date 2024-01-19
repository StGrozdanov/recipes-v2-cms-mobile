import { BASE_URL, UserData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useQuery } from "react-query";

/**
 * hook to handle all user related requests
 * @returns handler functions
 */
export const useUserService = () => {
    const { authGET } = useRequestHandler();

    const useGetAllUsers = () => {
        const {
            data: users,
            error: usersFetchError,
            isFetching: usersAreLoading
        } = useQuery(['users'], (): Promise<UserData[]> => authGET(`${BASE_URL}/admin/users`));

        return {
            users,
            usersFetchError,
            usersAreLoading
        }
    }

    return {
        useGetAllUsers,
    }
}