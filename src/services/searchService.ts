import { BASE_URL, CommentSearchData, GlobalSearchData, RecipeSearchData, UserSearchData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";

/**
 * hook to handle all auth related requests
 * @returns handler functions
 */
export const useSearchService = () => {
    const { authGET } = useRequestHandler();

    const searchUsersByUsername = (username: string): Promise<UserSearchData> => authGET(`${BASE_URL}/admin/search?users=${username}`)
    const searchComments = (query: string): Promise<CommentSearchData> => authGET(`${BASE_URL}/admin/search?comments=${query}`)
    const searchRecipes = (search: string): Promise<RecipeSearchData> => authGET(`${BASE_URL}/admin/search?recipes=${search}`)
    const globalSearch = (search: string): Promise<GlobalSearchData[]> => authGET(`${BASE_URL}/admin/search?global=${search}`)

    return {
        searchUsersByUsername,
        searchComments,
        searchRecipes,
        globalSearch,
    }
}
