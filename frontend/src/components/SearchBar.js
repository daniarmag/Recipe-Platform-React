import React, { useState } from 'react';
import { useRecipes } from '../context/RecipesContext.js';
import { useTheme } from '../context/ThemeContext';

/**
 * SearchBar component renders a search input field, a search button,
 * and a checkbox for filtering recipes.
 * It allows users to input search queries, trigger a search action,
 * and filter recipes based on ownership.
 */
function SearchBar() {
  const { searchQuery, updateSearchQuery, filterOwnedRecipes, toggleFilterOwnedRecipes } = useRecipes();
  const [inputValue, setInputValue] = useState(searchQuery);

  const { theme } = useTheme();
  const { isDarkMode } = theme;

  // Handles changes in the search input field.
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    updateSearchQuery(e.target.value);
  };

  // Handles the search action by updating to the current query.
  const handleSearch = () => {
    updateSearchQuery(inputValue);
  };

  // Handles checkbox change for filtering owned recipes.
  const toggleFilter = () => {
    toggleFilterOwnedRecipes(!filterOwnedRecipes);
  };

  // Style for the search button based on theme.
  const searchBtnStyle = {
    backgroundColor: isDarkMode ? '#1A202C' : '#48BB78',
  };

  return (
    <div className='flex justify-center w-full mx-auto px-4 '>
      <input
        type="text"
        className="text-sm text-left w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border rounded p-2 mx-2"
        placeholder="Search for a recipe"
        value={inputValue}
        onChange={handleInputChange}
      />
       {/* Toggle switch for filtering "My Recipes" or "All Recipes" */}
      <label className="flex items-center cursor-pointer mx-2">
        <div className="relative">
          <input
            type="checkbox"
            id="toggleFilter"
            className="sr-only"
            checked={filterOwnedRecipes}
            onChange={toggleFilter}
          />
          <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div
            className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              filterOwnedRecipes ? 'translate-x-6' : '-translate-x-1'
            } -top-1.5`}
          ></div>
        </div>
        <div className="ml-3 w-20 text-sm">
          <label htmlFor="toggleFilter" className="cursor-pointer">
            {filterOwnedRecipes ? 'My Recipes' : 'All Recipes'}
          </label>
        </div>
      </label>
      {/* Search button */}
      <button className="p-2 text-white rounded-md " style={searchBtnStyle} onClick={handleSearch}>
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
