import React, { createContext, useState, useContext } from 'react';

// Create ThemeContext
const ThemeContext = createContext();

// Custom hook to use ThemeContext
export const useTheme = () => useContext(ThemeContext);


// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    darkMode: 'light', // light or dark
    isDarkMode: false,
    light: {
        primary: 'green-400', // Set your primary color
        secondary: 'gray-200', // Set your secondary color
    },
    dark: {
        primary: 'gray-800', // Set your primary color
        secondary: 'gray-800', // Set your secondary color
    }
  });
  const isDarkMode = (mode) => {
    return mode === 'dark' ? true : false;
  }
  const toggleDarkMode = () => {
    const toggledDarkMode = theme.darkMode==='light' ? 'dark' : 'light';
    console.log(toggledDarkMode)

    setTheme((prevTheme) => ({ ...prevTheme, isDarkMode: isDarkMode(toggledDarkMode), darkMode: toggledDarkMode  }));
  };

  // Dynamic classes based on theme
  const themeClasses = theme.darkMode ? 'dark' : 'light';

  return (
    <ThemeContext.Provider value={{ theme, toggleDarkMode }}>
      <div className={themeClasses}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
