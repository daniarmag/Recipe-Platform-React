import React from "react";
import CreateNewRecipe from "../components/NewRecipeForm"; // Replace with the correct path
import { useTheme } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

function AddRecipePage() {
  const { theme } = useTheme();
  const { darkMode } = theme;

  const pageBackgroundColor = darkMode === "dark" ? "DarkGray" : "white";

  return (
    <div
      style={{ backgroundColor: pageBackgroundColor }}
      className="min-h-screen"
    >
      <Navbar />
      {/* Other content of your AddRecipePage if any */}
      <CreateNewRecipe />
    </div>
  );
}

export default AddRecipePage;
