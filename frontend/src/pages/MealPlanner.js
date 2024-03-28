// Import the MealPlanner component
import MealPlanner from "../components/MealPlannerTable";

import { useTheme } from "../context/ThemeContext";

// Your MealPlanner page component
function MealPlannerPage() {
  // Access the theme from the theme context
  const { theme } = useTheme();
  const { darkMode } = theme;

  // Determine the background color based on the current theme
  const pageBackgroundColor = darkMode === "dark" ? "DarkGray" : "white";

  return (
    <div
      className="page-container"
      style={{ backgroundColor: pageBackgroundColor }}
    >
      {/* Include the MealPlanner component */}
      <MealPlanner />
    </div>
  );
}

export default MealPlannerPage;
