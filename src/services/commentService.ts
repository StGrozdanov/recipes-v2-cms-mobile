import { BASE_URL, CommentData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useMutation, useQuery } from "react-query";
import { useCallback } from "react";

/**
 * hook to handle all user related requests
 * @returns handler functions
 */
export const useCommentService = () => {
    const { authGET, authDELETE } = useRequestHandler();

    const useGetAllComments = () => {
        const {
            data: comments,
            error: commentsFetchError,
            isFetching: commentsAreLoading
        } = useQuery(['comments'], (): Promise<CommentData[]> => authGET(`${BASE_URL}/admin/comments`));

        return {
            comments,
            commentsFetchError,
            commentsAreLoading
        }
    }

    const useDeleteComment = () => {
        const {
            mutateAsync: deleteCommentMutation,
            isLoading,
            isError,
        } = useMutation((id: number) => {
            const response: Promise<{ status: string }> = authDELETE(`${BASE_URL}/admin/comments/${id}`);
            return response;
        });

        const deleteComment = useCallback(async (id: number) => {
            try {
                const deleteCommentResponse = deleteCommentMutation(id);
                return { deleteCommentResponse };
            } catch (error) {
                return { error };
            }
        }, [deleteCommentMutation]);

        return { deleteComment, isLoading, isError };
    };

    return {
        useGetAllComments,
        useDeleteComment,
    }
}