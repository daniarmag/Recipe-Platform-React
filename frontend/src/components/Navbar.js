import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

function Navbar() {
  const { theme, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  
  const navItems = [
    { text: 'Home', href: '/', id: 'home-page' },
    { text: 'Add New Recipe', href: '/new-recipe', id: 'newRecipe-page' },
    { text: 'Meal Planner', href: '/meal-planner', id: 'mealPlanner-page' },
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
    <div className={`mx-auto flex flex-col sm:flex-row justify-between items-center py-2 shadow-md w-full top-0 z-50 ${theme[theme.darkMode].primary}`}>
      <div className="flex items-center w-full flex-1">
        {user && (
          <>
           <p className="text-white text-xl px-2">
        <strong style={{ fontWeight: 'bold' }}>Hello {user.displayName || user.email}</strong>
           </p>

            {/* Hide the LogoutButton in mobile view */}
            <div className="sm:flex hidden "><LogoutButton /></div>
            
          </>
        )}
       <button onClick={toggleMenu} className={`text-white  text-2xl sm:hidden sm:self-end mx-2 right-0 absolute`}>
        &#9776;
      </button>
      </div>
      
      

      {(user) && (
        <ul className={`sm:flex space-x-8 sm:relative hidden`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <Link to={item.href} id={item.id} className={`text-white text-xl ${
                isDarkMode ? ' hover:text-green-400 duration-300' : ' hover:text-blue-600 duration-300'
              } duration-200`} >
                {item.text}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={toggleDarkMode}
              className={`text-white text-xl duration-200 border border-white rpp rounded-full mx-2 px-1 focus:outline-none 
                bg-${theme[theme.darkMode].secondary}
                }`}
            >
              {theme.isDarkMode ? '☀️' : '🌑'}
            </button>
          </li>
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
                  className={`text-white text-xl duration-200 rounded-lg focus:outline-none ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'}
                    bg-${theme[theme.darkMode].secondary}
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
