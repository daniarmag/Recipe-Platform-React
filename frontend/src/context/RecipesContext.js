import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesApi from '../api/RecipesApi';

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('searchQuery') || '';

  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const fetchRecipes = useMemo(
    () => async () => {
      // Fetch recipes using searchQuery
      const fetchedRecipes = await RecipesApi.getRecipes(searchQuery);
      setRecipes(fetchedRecipes);
    },
    [searchQuery] // Empty dependency array means the function is memoized for the component's lifetime
  );

  useEffect(() => {
    // Fetch recipes based on the search query from an API or other data source
    // For simplicity, let's assume recipes are fetched from an API and set to state
    

    fetchRecipes();
  }, [searchQuery]);

  const updateSearchQuery = (newQuery) => {
    // Update URL with the new search query
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('searchQuery', newQuery);
    window.history.pushState({}, '', `?${newSearchParams.toString()}`);

    // Update state
    setSearchQuery(newQuery);
  };

  return (
    <RecipesContext.Provider value={{ recipes, searchQuery, updateSearchQuery, fetchRecipes }}>
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipesProvider');
  }
  return context;
};
