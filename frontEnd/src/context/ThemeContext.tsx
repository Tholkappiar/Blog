import { createContext, ReactNode, useEffect, useState } from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    toggleTheme: () => void;
}

interface ThemeProviderType {
    children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<ThemeProviderType> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    function toggleTheme() {
        setIsDarkMode((prev) => {
            const newValue = !prev;
            localStorage.theme = newValue ? "dark" : "light";
            return newValue;
        });
    }

    useEffect(() => {
        const darkMode =
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches);
        setIsDarkMode(darkMode);
    }, []);

    return (
        <ThemeContext.Provider
            value={{ isDarkMode, setIsDarkMode, toggleTheme }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
