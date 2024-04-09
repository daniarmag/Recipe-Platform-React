import React from "react";
import { useParams } from "react-router-dom";
import EditRecipeForm from "../components/EditRecipeForm";

import { useTheme } from "../context/ThemeContext";

// Component for the "Edit Recipe" page
const EditRecipePage = () => {
  // Retrieve the recipeId from the route parameters
  const { recipeId } = useParams();
  console.log(recipeId);
  // Access the theme from the theme context
  const { theme } = useTheme();
  const { isDarkMode } = theme;

  // Determine the background color based on the current theme
  const pageBackgroundColor = isDarkMode ? "DarkGray" : "white";

  return (
    <div
      style={{ backgroundColor: pageBackgroundColor }}
      className="page-container"
    >
      <div className="text-3xl  text-gray-800 font-bold  pt-3 text-center bigTitle sm:text-3xl mb-3 AssistantFont">
        EDIT RECIPE
      </div>
      <EditRecipeForm recipeId={recipeId} />
    </div>
  );
};

export default EditRecipePage;
