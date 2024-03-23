import React from "react";
import { useParams } from "react-router-dom";
import EditRecipeForm from "../components/EditRecipeForm";

import { useTheme } from "../context/ThemeContext";

const EditRecipePage = () => {
  const { recipeId } = useParams();
  console.log(recipeId);
  const { theme } = useTheme();
  const { darkMode } = theme;

  const pageBackgroundColor = darkMode === "dark" ? "DarkGray" : "white";

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
