import { BASE_URL, CommentData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useQuery } from "react-query";

/**
 * hook to handle all user related requests
 * @returns handler functions
 */
export const useCommentService = () => {
    const { authGET } = useRequestHandler();

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

    return {
        useGetAllComments,
    }
}