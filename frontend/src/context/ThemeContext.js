import React, { createContext, useState, useContext } from 'react';

// Create ThemeContext
const ThemeContext = createContext();

// Custom hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    darkMode: 'light', // light or dark
    light: {
      primary: 'bg-green-400', // Set your primary color
      secondary: 'aliceblue', // Set your secondary color
      card: 'GhostWhite'
    },
    dark: {
      primary: 'bg-gray-900', // Set your primary color
      secondary: 'gray', // Set your secondary color
      card: 'DarkGray'
    },
  });

  // Dynamic classes based on theme
  const themeClasses = theme.darkMode === 'dark' ? 'dark' : 'light';

  const toggleDarkMode = () => {
    const toggledDarkMode = theme.darkMode === 'dark' ? 'light' : 'dark';

    setTheme((prevTheme) => ({
      ...prevTheme,
      isDarkMode: toggledDarkMode === 'dark', // Set isDarkMode based on toggledDarkMode
      darkMode: toggledDarkMode,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      <div className={themeClasses}>{children}</div>
    </ThemeContext.Provider>
  );
};
