import { BASE_URL, RecipeData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useQuery } from "react-query";

/**
 * hook to handle all recipe related requests
 * @returns handler functions
 */
export const useRecipesService = () => {
    const { authGET } = useRequestHandler();

    const useGetAllRecipes = () => {
        const {
            data: recipes,
            error: recipesFetchError,
            isFetching: recipesAreLoading
        } = useQuery(['recipes'], (): Promise<RecipeData[]> => authGET(`${BASE_URL}/admin/recipes`));

        return {
            recipes,
            recipesFetchError,
            recipesAreLoading
        }
    }

    return {
        useGetAllRecipes,
    }
}