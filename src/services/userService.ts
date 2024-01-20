import { BASE_URL, BlockUserParams, ChangeRoleParams, UserData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useMutation, useQuery } from "react-query";
import { useCallback } from "react";

/**
 * hook to handle all user related requests
 * @returns handler functions
 */
export const useUserService = () => {
    const { authGET, authDELETE, authPATCH, authPOST } = useRequestHandler();

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

    const useBlockUser = () => {
        const {
            mutateAsync: blockUserMutation,
            isLoading,
            isError,
        } = useMutation((data: BlockUserParams) => {
            const response: Promise<{ status: string }> = authPOST(`${BASE_URL}/admin/users/block`, data);
            return response;
        });

        const blockUser = useCallback(async (data: BlockUserParams) => {
            try {
                const blockUserResponse = blockUserMutation(data);
                return { blockUserResponse };
            } catch (error) {
                return { error };
            }
        }, [blockUserMutation]);

        return { blockUser, isLoading, isError };
    };

    const useUnblockUser = () => {
        const {
            mutateAsync: unblockUserMutation,
            isLoading,
            isError,
        } = useMutation((userId: number) => {
            const response: Promise<{ status: string }> = authPOST(`${BASE_URL}/admin/users/unblock/${userId}`);
            return response;
        });

        const unblockUser = useCallback(async (userId: number) => {
            try {
                const unblockUserResponse = unblockUserMutation(userId);
                return { unblockUserResponse };
            } catch (error) {
                return { error };
            }
        }, [unblockUserMutation]);

        return { unblockUser, isLoading, isError };
    };

    return {
        useGetAllUsers,
        useDeleteUser,
        useUpdateRole,
        useBlockUser,
        useUnblockUser,
    }
}