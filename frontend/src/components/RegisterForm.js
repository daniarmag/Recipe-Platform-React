import React, { useState } from 'react';
import UsersApi from '../api/UsersApi';
import { useAuth } from '../context/AuthContext';
import { AiOutlineUser, AiOutlineLock, AiOutlineAccountBook, AiOutlineLogin } from 'react-icons/ai';

const RegisterForm = ({ handleToggleMode }) => {
  const { login } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState(null); // New state for error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reset the error state
      setError(null);

      // Registration logic using UsersApi.registerUser(formData)
      await UsersApi.registerUser({ username: userName, password, displayName: displayName });
      console.log('Registration successful');

      // Automatically log in the user after registration
      await login({ username: userName, password });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data);
      } else {
        setError('Registration error. Please try again later.');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-2xl shadow-md w-full sm:w-96 bg-zinc-200 bg-opacity-20 backdrop-filter backdrop-blur-md border border-white">
        <h2 className="text-2xl font-bold mb-4 text-green-600">REGISTER</h2>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center border-b border-green-500">
          <AiOutlineUser className="text-2xl mr-2 text-green-500" />
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              placeholder='Enter your username'
              onChange={(e) => setUserName(e.target.value)}
              className="w-full border-none p-2 bg-transparent"
              required
            />
          </div>
          <div className="mb-4 flex items-center border-b border-green-500">
          <AiOutlineLock className="text-2xl mr-2 text-green-500" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-none p-2 bg-transparent"
              required
            />
          </div>
          <div className="mb-4 flex items-center border-b border-green-500">
          <AiOutlineLogin className="text-2xl mr-2 text-green-500" />
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder='Enter your Chef Nickname'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full border-none p-2 bg-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 bg-opacity-60 text-white p-2 rounded-2xl hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 mt-4">

            LOGIN
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className={`text-green-500 underline`}
              onClick={handleToggleMode}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
