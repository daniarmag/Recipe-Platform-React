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
    isDarkMode: false,
    light: {
      primary: "bg-green-400", 
      secondary: "bg-slate-50",
      card: "bg-slate-100",
    },
    dark: {
      primary: "bg-gray-900", 
      secondary: "bg-gray-300",
      card: "bg-gray-400",
    },
  });

  // Dynamic classes based on theme
  const themeClasses = theme.isDarkMode ? "dark" : "light";

 
  // Function to toggle dark mode
  const toggleDarkMode = () => {
    const toggledDarkMode = theme.isDarkMode ? "light" : "dark";

    // Update theme state
    setTheme((prevTheme) => ({
      ...prevTheme,
      isDarkMode: !prevTheme.isDarkMode, // Set isDarkMode based on toggledDarkMode
      darkMode: toggledDarkMode,
    }));
  };
 
  // Function to get current theme
 const getTheme = () => {
  return theme[theme.darkMode];
};
  // Provide theme and toggleDarkMode function to children components
  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode, getTheme }}>
      <div className={themeClasses}>{children}</div>
    </ThemeContext.Provider>
  );
};
