import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import { FiSun, FiMoon } from 'react-icons/fi'; // Import sun and moon icons

function Navbar() {
  const { theme, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  
  const navItems = [
    { text: 'HOME', href: '/', id: 'home-page' },
    { text: 'ADD NEW RECIPE', href: '/new-recipe', id: 'newRecipe-page' },
    { text: 'MEAL PLANNER', href: '/meal-planner', id: 'mealPlanner-page' },
  ];

  const popUpLinks = [
    { text: 'Home', href: '/' },
    { text: 'New Recipe', href: '/new-recipe' },
    { text: 'Meal Planner', href: '/meal-planner' },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const { isDarkMode } = theme;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className={`mx-auto flex flex-col sm:flex-row justify-between items-center py-4  ${theme[theme.darkMode].primary}`}>
    <div className="flex items-center w-full flex-1">
      {user && (
        <>
          <p className="text-white text-xl px-2 AssistantFont">
            Hello, <strong>{user.displayName || user.email}</strong>
          </p>

          <button onClick={toggleMenu} className={`text-white text-2xl sm:hidden sm:self-end mx-2 right-0 absolute`}>
            &#9776;
          </button>
        </>
      )}
    </div>
      
      

        {(user) && (
      <ul className={`sm:flex space-x-8 sm:relative hidden items-center`}>
        {navItems.map((item) => (
          <li key={item.id} className="flex items-center"> {/* Ensure each nav item is also a flex container */}
            <Link to={item.href} id={item.id} className={`text-white text-xl AssistantFont ${
              isDarkMode ? ' hover:text-green-400 duration-300' : ' hover:text-blue-600 duration-300'
            } duration-200`} >
              {item.text}
            </Link>
          </li>
        ))}
        <div className="flex items-center space-x-2">
          <LogoutButton className="flex items-center justify-center text-white text-2xl" />
          <button
            onClick={toggleDarkMode}
            className={`text-white text-2xl duration-200 mx-2 px-1 focus:outline-none ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'}`}
          >
            {theme.isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>

      </ul>
    )}


      {user && showMenu && (
        <div className={`sm:hidden absolute top-10 right-0 px-2 shadow-lg ${theme[theme.darkMode].primary} `}>
          {popUpLinks.map((link) => ( 
            <div key={link.text} className="mb-2">
              <Link to={link.href} className={`text-white text-xl duration-200 ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'} `}>
                {link.text}
              </Link>
            </div>
          ))}

          {user && (
            <>
              <div className="mb-2">
                <button
                  onClick={toggleDarkMode}
                  className={`text-white text-xl duration-200  focus:outline-none ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'}
                  }`}
                >
                  {theme.isDarkMode ? 'LightMode' : 'DarkMode'}
                </button>
              </div>
              <div className="mb-2">
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
