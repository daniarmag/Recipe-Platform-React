import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginForm = ({ handleToggleMode }) => {
  const { login } = useAuth(); // Use the login function from AuthContext
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // New state for error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reset the error state
      setError(null);

      // Authentication logic using AuthContext login function
      await login({ username: userName, password });
      console.log('Login successful');
    } catch (error) {
      // Set the error state with the error message
      setError('Invalid username or password');
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 rounded shadow-md w-full sm:w-96 bg-zinc-400">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300`}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className={`text-blue-500 underline`}
              onClick={handleToggleMode}
            >
              Create one here.
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
