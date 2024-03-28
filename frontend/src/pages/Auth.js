import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

// Component for the authentication page
const AuthPage = () => {
  // State to track whether to show the register form or the login form
  const [isRegisterMode, setRegisterMode] = useState(false);

  // Function to toggle between register and login modes
  const handleToggleMode = () => {
    // Update the register mode state to its opposite value
    setRegisterMode((prevMode) => !prevMode);
  };

  return (
    <div className=" page-container text-center bg-gradient-to-b from-[hsl(60,70%,80%)] to-[hsl(120,70%,80%)] ">
      {isRegisterMode ? (
        <RegisterForm handleToggleMode={handleToggleMode} />
      ) : (
        <LoginForm handleToggleMode={handleToggleMode} />
      )}
    </div>
  );
};

export default AuthPage;
