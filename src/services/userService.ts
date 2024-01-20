import { BASE_URL, ChangeRoleParams, UserData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useMutation, useQuery } from "react-query";
import { useCallback } from "react";

/**
 * hook to handle all user related requests
 * @returns handler functions
 */
export const useUserService = () => {
    const { authGET, authDELETE, authPATCH } = useRequestHandler();

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

    const useUpdateRole = () => {
        const {
            mutateAsync: updateUserRoleMutation,
            isLoading,
            isError,
        } = useMutation((data: ChangeRoleParams) => {
            const response: Promise<{ status: string }> = authPATCH(`${BASE_URL}/admin/users/change-role`, data);
            return response;
        });

        const changeRole = useCallback(async (data: ChangeRoleParams) => {
            try {
                const updateUserRoleResponse = updateUserRoleMutation(data);
                return { updateUserRoleResponse };
            } catch (error) {
                return { error };
            }
        }, [updateUserRoleMutation]);

        return { changeRole, isLoading, isError };
    };

    return {
        useGetAllUsers,
        useDeleteUser,
        useUpdateRole,
    }
}