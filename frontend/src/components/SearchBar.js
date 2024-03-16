import React, { useState } from 'react';
import { useRecipes } from '../context/RecipesContext.js';
import {useTheme} from '../context/ThemeContext';

function SearchBar() {
  const { searchQuery, updateSearchQuery  } = useRecipes();
  const [inputValue, setInputValue] = useState(searchQuery);


  const { theme } = useTheme();
  const { darkMode } = theme;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    updateSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    updateSearchQuery(inputValue);
  };

  const searchBtnStyle = {
    backgroundColor:darkMode === 'dark' ?'#1A202C' : '#48BB78',
  };

  return (
    <div className='flex justify-center w-full mx-auto px-4'>
      <input
        type="text"
        className="text-sm text-left w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border rounded p-2 mx-2"
        placeholder="Search for a recipe"
        value={inputValue}
        onChange={handleInputChange}
      />
      {/*  bg-green-500 */}
       <button className="p-2 text-white rounded-md" style={searchBtnStyle} onClick={handleSearch}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-5.2-5.2"
          />
          <circle cx="10" cy="10" r="8" />
        </svg>
      </button>
    </div>
  );
}

export default SearchBar;
