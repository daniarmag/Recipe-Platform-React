import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { AiOutlineUser, AiOutlineLock, AiOutlineLogout } from 'react-icons/ai';

/**
 * Component for rendering the logout button.
 */
function LogoutButton() {
  const { theme } = useTheme();
  const {isDarkMode} = theme;
  const { logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Handles the logout action.
   */
  const handleLogout = async () => {
    await logout();
    // Redirect to the home page
    navigate('/'); 
  };

  return (
    // <button
    //   onClick={handleLogout}
    //   className={`text-white text-xl duration-200 rounded-lg focus:outline-none ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'}
    //     bg-${theme[theme.darkMode].secondary}
    //   }`}
    // >
    //   Logout
    // </button>
<button
  onClick={handleLogout}
  className={`text-white flex items-center justify-center text-2xl duration-200 focus:outline-none ${isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'}`}
  style={{
    transition: 'filter 0.3s ease', // Adding transition for smooth hover effect
  }}
  onMouseEnter={(e) => e.currentTarget.style.filter = 'invert(50%)'} // Reverting filter on hover
  onMouseLeave={(e) => e.currentTarget.style.filter = 'invert(0%)'} // Applying filter back on mouse leave
>
  <AiOutlineLogout />
</button>
  );
}

export default LogoutButton;
