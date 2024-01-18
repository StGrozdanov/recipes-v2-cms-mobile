import { useSearchService } from "../../../services/searchService";

/**
 * hook that returns the results of the search depending on the location that is being used. It might return
 * user search, recipes search, comments search results or in a case of not finding the desired collection, depending
 * on the location - it returns a global search flag as a string
 */
export const useSearchLocations = () => {
    const { searchComments, searchRecipes, searchUsersByUsername } = useSearchService();

    const searchHandler = async (location: string, query: string): Promise<{ content: string[] } | undefined | 'global'> => {
        if (query !== '') {
            switch (location) {
                case 'Users':
                    return await searchUsersByUsername(query);
                case 'Recipes':
                    return await searchRecipes(query);
                case 'Comments':
                    return await searchComments(query);
                default:
                    return 'global'
            }
        }
    }

    return { searchHandler }
}