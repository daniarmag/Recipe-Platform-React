import React, { useState } from 'react';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    console.log('Username:', userName);
    console.log('Password:', password);
    // You can replace the console logs with your authentication logic
  };

  const handleCreateAccount = () => {
    // Add logic to navigate to the registration page or show a registration form
    console.log('Navigate to registration page or show registration form');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
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
            className="bg-green-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" 
          > 
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className="text-blue-500 underline"
              onClick={handleCreateAccount}
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
