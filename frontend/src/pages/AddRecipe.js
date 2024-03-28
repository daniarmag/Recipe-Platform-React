import React from "react";
import CreateNewRecipe from "../components/NewRecipeForm"; // Replace with the correct path
import { useTheme } from "../context/ThemeContext";

// Component for the "Add Recipe" page
function AddRecipePage() {
  // Access the theme from the theme context
  const { theme } = useTheme();
  const { darkMode } = theme;

  // Determine the background color based on the current theme
  const pageBackgroundColor = darkMode === "dark" ? "DarkGray" : "white";

  return (
    <div
      style={{ backgroundColor: pageBackgroundColor }}
      className="page-container"
    >
      <CreateNewRecipe />
    </div>
  );
}

export default AddRecipePage;
