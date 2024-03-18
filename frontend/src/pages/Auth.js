import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [isRegisterMode, setRegisterMode] = useState(false);

  const handleToggleMode = () => {
    setRegisterMode((prevMode) => !prevMode);
  };

  return  (
      <div className='text-center justify-center flex bg-green-400'>
        <div className=''>
          {isRegisterMode ? (
            <RegisterForm handleToggleMode={handleToggleMode} />
          ) : (
            <LoginForm handleToggleMode={handleToggleMode} />
          )}
        </div>
       
      </div>

  
  );
};

export default AuthPage;