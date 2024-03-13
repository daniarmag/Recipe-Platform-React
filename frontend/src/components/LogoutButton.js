import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function LogoutButton() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/'); // Redirect to the home page
  };

  return (
    <button
      onClick={handleLogout}
      className={`text-white text-xl duration-200 rounded-lg focus:outline-none ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'}
        bg-${theme[theme.darkMode].secondary}
      }`}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
