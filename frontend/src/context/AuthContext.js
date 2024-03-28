// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import UsersApi from '../api/UsersApi';

// Creating a context to manage authentication state
const AuthContext = createContext();

// Provider component to wrap the application and provide authentication context
export const AuthProvider = ({ children }) => {
  // State to manage the current user and loading state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect to fetch the current user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // const currentUser = await UsersApi.getCurrentUser();
        // setUser(currentUser);
      } catch (error) {
        console.error('Error fetching current user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Function to login a user
  const login = async (formData) => {
    try {
      const loggedInUser = await UsersApi.loginUser(formData);
      setUser(loggedInUser);
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  // Function to logout a user
  const logout = async () => {
    try {
      await UsersApi.logoutUser();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  };

  // Providing the authentication context value to the children components
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};  

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
