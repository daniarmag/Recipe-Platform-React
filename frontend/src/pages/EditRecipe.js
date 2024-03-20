import React from "react";
import { useParams } from "react-router-dom";
import EditRecipeForm from "../components/EditRecipeForm";
import Navbar from "../components/Navbar";
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
      className="min-h-screen">
      <Navbar />
      <div className="text-3xl  text-gray-800 font-bold text-center py-3 bigTitle sm:text-3xl mt-3 mb-3 AssistantFont">
        EDIT RECIPE
      </div>
      <EditRecipeForm recipeId={recipeId} />
    </div>
  );
};

export default EditRecipePage;
