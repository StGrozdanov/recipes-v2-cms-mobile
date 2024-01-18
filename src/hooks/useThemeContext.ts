import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

/**
 * hook that gives access to the theme context
 */
export const useThemeContext = () => useContext(ThemeContext);