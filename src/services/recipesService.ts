import { BASE_URL, RecipeData } from "./types";
import { useRequestHandler } from "../hooks/useRequestHandler";
import { useMutation, useQuery } from "react-query";
import { useCallback } from "react";

/**
 * hook to handle all recipe related requests
 * @returns handler functions
 */
export const useRecipesService = () => {
    const { authGET, authDELETE } = useRequestHandler();

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

    const useDeleteRecipe = () => {
        const {
            mutateAsync: deleteRecipeMutation,
            isLoading,
            isError,
        } = useMutation((id: number) => {
            const response: Promise<{ status: string }> = authDELETE(`${BASE_URL}/admin/recipes/${id}`);
            return response;
        });

        const deleteRecipe = useCallback(async (id: number) => {
            try {
                const deleteRecipeResponse = deleteRecipeMutation(id);
                return { deleteRecipeResponse };
            } catch (error) {
                return { error };
            }
        }, [deleteRecipeMutation]);

        return { deleteRecipe, isLoading, isError };
    };

    return {
        useGetAllRecipes,
        useDeleteRecipe,
    }
}