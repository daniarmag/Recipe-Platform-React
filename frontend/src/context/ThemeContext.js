import React, { createContext, useState, useContext } from "react";

// Create ThemeContext
const ThemeContext = createContext();

// Custom hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    // light or dark
    darkMode: "light", 
    light: {
      primary: "bg-green-400", 
      secondary: "white",
      card: "GhostWhite",
    },
    dark: {
      primary: "bg-gray-900", 
      secondary: "gray",
      card: "DarkGray",
    },
  });

  // Dynamic classes based on theme
  const themeClasses = theme.darkMode === "dark" ? "dark" : "light";

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const toggledDarkMode = theme.darkMode === "dark" ? "light" : "dark";

    // Update theme state
    setTheme((prevTheme) => ({
      ...prevTheme,
      isDarkMode: toggledDarkMode === "dark", // Set isDarkMode based on toggledDarkMode
      darkMode: toggledDarkMode,
    }));
  };

  // Provide theme and toggleDarkMode function to children components
  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      <div className={themeClasses}>{children}</div>
    </ThemeContext.Provider>
  );
};
