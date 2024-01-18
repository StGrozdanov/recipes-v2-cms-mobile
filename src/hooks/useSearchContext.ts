import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

/**
 * hook that gives access to the Search context
 */
export const useSearchContext = () => useContext(SearchContext);