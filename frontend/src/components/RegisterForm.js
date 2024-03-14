import React, { useState } from 'react';
import UsersApi from '../api/UsersApi';
import { useAuth } from '../context/AuthContext';

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
        setError('Username already exists. Please choose a different username.');
      } else {
        setError('Registration error. Please try again later.');
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className= "p-8 rounded shadow-md w-full sm:w-96 bg-zinc-400">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              placeholder='Enter your private UserName'
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter your private PassWord'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-600">
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder='Enter your Checf Nickname'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300`}
          >
            Register & Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className={`text-blue-500 underline`}
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
