import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [isRegisterMode, setRegisterMode] = useState(false);

  const handleToggleMode = () => {
    setRegisterMode((prevMode) => !prevMode);
  };

  return (
    <div>
      {isRegisterMode ? (
        <RegisterForm handleToggleMode={handleToggleMode} />
      ) : (
        <LoginForm handleToggleMode={handleToggleMode} />
      )}
    </div>
  );
};

export default AuthPage;