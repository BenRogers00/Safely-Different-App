
/**
 * Custom hook for managing dark mode state.
 *
 * @returns {Array} An array containing the current dark mode state and a function to toggle the dark mode.
 */
import { useEffect, useState } from "react";

function useDarkMode(){

    const [isDarkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === 'dark' : false;
    });

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        const html = window.document.documentElement;
        const currentTheme = isDarkMode ? "dark" : "light";
        const previousTheme = isDarkMode ? "light" : "dark";
        
        html.classList.remove(previousTheme);
        html.classList.add(currentTheme);
        
        localStorage.setItem("theme", currentTheme);
    }, [isDarkMode]);

    return [isDarkMode, toggleDarkMode];
}

export default useDarkMode;