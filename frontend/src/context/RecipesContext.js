import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RecipesApi from "../api/RecipesApi";

// Create a context for recipes management
const RecipesContext = createContext();

// Hooks for managing location and navigation
export const RecipesProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // Memoized search parameters based on location.search
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  // Initial query from URL search parameters
  const initialQuery = useMemo(
    () => searchParams.get("searchQuery") || "",
    [searchParams]
  );
  // Initial page from URL search parameters
  const initialPage = useMemo(
    () => parseInt(searchParams.get("page")) || 1,
    [searchParams]
  );
  // Initial page size from URL search parameters
  const initialPageSize = useMemo(
    () => parseInt(searchParams.get("pageSize")) || 8,
    [searchParams]
  );

  // State variables for managing recipes and pagination
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(1); // Added for tracking total pages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch recipes from the API
  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch recipes using searchQuery, page, and pageSize
      const response = await RecipesApi.getRecipes({
        searchQuery,
        page,
        pageSize,
      });
      setRecipes(response.data);
      setTotalPages(Math.ceil(response.total / pageSize));
    } catch (error) {
      setError(error.message || "Error loading recipes");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, page, pageSize]);

  // Memoize fetchRecipes function
  const memoizedFetchRecipes = useMemo(() => fetchRecipes, [fetchRecipes]);

  // Function to update search query and navigate
  const updateSearchQuery = useCallback(
    (newQuery) => {
      // Update URL with the new search query and reset page to 1
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("searchQuery", newQuery);
      newSearchParams.set("page", "1"); // Reset page to 1
      navigate(`?${newSearchParams.toString()}`);

      // Update state
      setSearchQuery(newQuery);
      setPage(1);
    },
    [location.search, navigate]
  );

  // Function to update page and navigate
  const updatePage = useCallback(
    (newPage) => {
      // Update URL with the new page
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("page", String(newPage));
      navigate(`?${newSearchParams.toString()}`);

      // Update state
      setPage(newPage);
    },
    [location.search, navigate]
  );

  // Function to update page size and navigate
  const updatePageSize = useCallback(
    (newPageSize) => {
      // Update URL with the new page size
      const newSearchParams = new URLSearchParams(location.search);
      newSearchParams.set("pageSize", String(newPageSize));
      navigate(`?${newSearchParams.toString()}`);

      // Update state
      setPageSize(newPageSize);
    },
    [location.search, navigate]
  );

  // Function to edit a recipe
  const editRecipe = useCallback(
    async (recipeId, updatedRecipe) => {
      try {
        setLoading(true);
        setError(null);

        // Update recipe using API
        await RecipesApi.editRecipe(recipeId, updatedRecipe);

        // Refetch recipes to update the list
        fetchRecipes();
      } catch (error) {
        setError(error.message || "Error editing recipe");
      } finally {
        setLoading(false);
      }
    },
    [fetchRecipes]
  );

  // Function to delete a recipe
  const deleteRecipe = useCallback(
    async (recipeId) => {
      try {
        setLoading(true);
        setError(null);

        // Delete recipe using API
        await RecipesApi.deleteRecipe(recipeId);

        // Refetch recipes to update the list
        fetchRecipes();
      } catch (error) {
        setError(error.message || "Error deleting recipe");
      } finally {
        setLoading(false);
      }
    },
    [fetchRecipes]
  );

  // Memoize context value to prevent unnecessary renders
  const contextValue = useMemo(
    () => ({
      recipes,
      searchQuery,
      page,
      pageSize,
      totalPages,
      loading,
      error,
      updateSearchQuery,
      updatePage,
      updatePageSize,
      editRecipe,
      deleteRecipe,
      fetchRecipes: memoizedFetchRecipes,
    }),
    [
      recipes,
      searchQuery,
      page,
      pageSize,
      totalPages,
      loading,
      error,
      updateSearchQuery,
      updatePage,
      updatePageSize,
      editRecipe,
      deleteRecipe,
      memoizedFetchRecipes,
    ]
  );

  // Provide the context value to the children components
  return (
    <RecipesContext.Provider value={contextValue}>
      {children}
    </RecipesContext.Provider>
  );
};

// Custom hook to use the recipes context
export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }
  return context;
};
