import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [isRegisterMode, setRegisterMode] = useState(false);

  const handleToggleMode = () => {
    setRegisterMode((prevMode) => !prevMode);
  };

  return  (
    <div className='text-center bg-green-400'>
      <label className='text-3xl font-bold text-white'>
        Recipe Sharing and Meal Planner
      </label>
      <div className='flex justify-center'>
        <div className='w-1/2 z-10'>
          {isRegisterMode ? (
            <RegisterForm handleToggleMode={handleToggleMode} />
          ) : (
            <LoginForm handleToggleMode={handleToggleMode} />
          )}
        </div>
       
      </div>
    </div>
  
  );
};

export default AuthPage;