import { BASE_URL, UserData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useMutation, useQuery } from "react-query";
import { useCallback } from "react";

/**
 * hook to handle all user related requests
 * @returns handler functions
 */
export const useUserService = () => {
    const { authGET, authDELETE } = useRequestHandler();

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

    const useDeleteUser = () => {
        const {
            mutateAsync: deleteUserMutation,
            isLoading,
            isError,
        } = useMutation((id: number) => {
            const response: Promise<{ status: string }> = authDELETE(`${BASE_URL}/admin/users/${id}`);
            return response;
        });

        const deleteUser = useCallback(async (id: number) => {
            try {
                const deleteUserResponse = deleteUserMutation(id);
                return { deleteUserResponse };
            } catch (error) {
                return { error };
            }
        }, [deleteUserMutation]);

        return { deleteUser, isLoading, isError };
    };

    return {
        useGetAllUsers,
        useDeleteUser,
    }
}