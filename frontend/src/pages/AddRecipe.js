import React from "react";
import CreateNewRecipe from "../components/NewRecipeForm"; // Replace with the correct path
import { useTheme } from "../context/ThemeContext";

// Component for the "Add Recipe" page
function AddRecipePage() {
  // Access the theme from the theme context
  const { getTheme } = useTheme();
  const currentTheme = getTheme();

  return (
    <div
      className={`page-container ${currentTheme.secondary}`}
    >
      <CreateNewRecipe />
    </div>
  );
}

export default AddRecipePage;
