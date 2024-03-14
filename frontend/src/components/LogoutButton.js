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
  className={`text-white text-xl duration-200 rounded-lg focus:outline-none ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'}
    bg-${theme[theme.darkMode].secondary}
  }`}
  style={{
    backgroundImage: `url('https://cdn.iconscout.com/icon/free/png-512/free-logout-1440154-1214655.png')`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    filter: 'invert(100%)', // Apply inversion to make the image white
    paddingLeft: '30px', // Adjust as needed to ensure the image is visible
    transition: 'filter 0.3s ease', // Adding transition for smooth hover effect
  }}
  onMouseEnter={(e) => e.target.style.filter = 'invert(50%)'} // Reverting filter on hover
  onMouseLeave={(e) => e.target.style.filter = 'invert(100%)'} // Applying filter back on mouse leave
>
  &nbsp; {/* Add non-breaking space to ensure button height is maintained */}
</button>
  );
}

export default LogoutButton;
