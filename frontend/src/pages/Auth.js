import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useTheme } from "../context/ThemeContext";

// Component for the authentication page
const AuthPage = () => {
  // State to track whether to show the register form or the login form
  const [isRegisterMode, setRegisterMode] = useState(false);

  // Function to toggle between register and login modes
  const handleToggleMode = () => {
    // Update the register mode state to its opposite value
    setRegisterMode((prevMode) => !prevMode);
  };

   // Access the theme context
   const { theme, toggleTheme } = useTheme();
   const { isDarkMode } = theme;

  return (
    <div
    className={`page-container text-center ${
      isDarkMode
        ? "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
        : "bg-gradient-to-b from-[hsl(60,70%,80%)] to-[hsl(120,70%,80%)] text-black"
    }`}
  >
    {isRegisterMode ? (
      <RegisterForm handleToggleMode={handleToggleMode} />
    ) : (
      <LoginForm handleToggleMode={handleToggleMode} />
    )}
  </div>
);
};
export default AuthPage;
