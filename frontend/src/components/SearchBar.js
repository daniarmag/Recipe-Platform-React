import React, { useState } from 'react';
import { useRecipes } from '../context/RecipesContext.js';

function SearchBar() {
  const { searchQuery, updateSearchQuery } = useRecipes();
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    updateSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    updateSearchQuery(inputValue);
  };

  return (
    <div className="flex justify-center w-full mx-auto">
      <input
        type="text"
        className="text-sm text-left w-full md:w-1/2 lg:w-1/3 xl:w-1/4 border rounded p-2 mx-2"
        placeholder="Search for a recipe"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button className="p-2 bg-green-500 text-white rounded-md" onClick={handleSearch}>
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
