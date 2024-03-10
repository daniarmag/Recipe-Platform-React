import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {useTheme} from '../context/ThemeContext';

function Navbar() {
    const navItems = [
        { text: 'Home', href: '/home', id: 'home-page' },
        { text: 'Add New Recipe', href: '/new-recipe', id: 'newRecipe-page' },
        { text: 'Meal Planner', href: '/meal-planner', id: 'mealPlanner-page' },
    ];

    const popUpLinks = [  
        { text: 'Home', href: '/home' },
        { text: 'New Recipe', href: '/new-recipe' },
        { text: 'Meal Planner', href: '/meal-planner' }
    ];

    const [showMenu, setShowMenu] = useState(false);
    const {theme, toggleDarkMode} = useTheme();
    
    const { darkMode } = theme;

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    

    return (
        <div className={`mx-auto flex flex-col sm:flex-row justify-between items-center py-3 shadow-md w-full top-0 z-50 ${theme[theme.darkMode].primary}`}>
          <div></div>
    
          <button onClick={toggleMenu} className={`text-white text-2xl sm:hidden focus:outline-none self-end mx-2`}>
            &#9776; {/* Hamburger icon */}
          </button>
    
          <ul className={`sm:flex space-x-8 sm:relative hidden`}>
            {navItems.map((item) => (
              <li key={item.id}>
                <Link to={item.href} id={item.id} className={`text-white text-xl ${
                theme.isDarkMode ? ' hover:text-green-400 duration-300': ' hover:text-blue-600 duration-300' 
              } duration-200`} >
                  {item.text}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggleDarkMode}
                className={`text-white text-xl duration-200 border border-white rounded-lg mx-2 px-3 focus:outline-none 
                bg-${theme[theme.darkMode].secondary}
                }`}
              >
                {theme.isDarkMode ? 'light' : 'dark'} Mode
              </button>
            </li>
          </ul>
    
          {showMenu && (
            <div className={`sm:hidden absolute top-14 right-0 p-4 px-2 shadow-lg ${theme[theme.darkMode].primary} `}>
              {popUpLinks.map((link) => (
                <div key={link.text} className="mb-2">
                  <Link to={link.href} className={`"text-white text-xl duration-200 ${theme.isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-950'} `}>
                    {link.text}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    export default Navbar;