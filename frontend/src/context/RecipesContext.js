import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipesApi from '../api/RecipesApi';

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('searchQuery') || '';
  const initialPage = parseInt(searchParams.get('page')) || 1;
  const initialPageSize = parseInt(searchParams.get('pageSize')) || 8;

  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1); // Added for tracking total pages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch recipes using searchQuery, page, and pageSize
      const response = await RecipesApi.getRecipes({ searchQuery, page, pageSize });
      setRecipes(response.data);
      setTotalPages(Math.ceil(response.total / pageSize));
    } catch (error) {
      setError(error.message || 'Error loading recipes');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, pageSize]);

  const memoizedFetchRecipes = useMemo(() => fetchRecipes, [fetchRecipes]);

  const updateSearchQuery = (newQuery) => {
    // Update URL with the new search query and reset page to 1
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('searchQuery', newQuery);
    newSearchParams.set('page', '1'); // Reset page to 1
    navigate(`?${newSearchParams.toString()}`);

    // Update state
    setSearchQuery(newQuery);
    setPage(1);
  };

  const updatePage = (newPage) => {
    // Update URL with the new page
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', String(newPage));
    navigate(`?${newSearchParams.toString()}`);

    // Update state
    setPage(newPage);
  };

  const updatePageSize = (newPageSize) => {
    // Update URL with the new page size
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('pageSize', String(newPageSize));
    navigate(`?${newSearchParams.toString()}`);

    // Update state
    setPageSize(newPageSize);
  };

  const contextValue = useMemo(
    () => ({ recipes, searchQuery, page, pageSize, totalPages, loading, error, updateSearchQuery, updatePage, updatePageSize, fetchRecipes: memoizedFetchRecipes }),
    [recipes, searchQuery, page, pageSize, totalPages, loading, error, updateSearchQuery, updatePage, updatePageSize, memoizedFetchRecipes]
  );

  return (
    <RecipesContext.Provider value={contextValue}>
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
