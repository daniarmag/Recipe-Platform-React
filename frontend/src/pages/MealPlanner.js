import MealPlanner from "../components/MealPlannerTable";
import { useTheme } from "../context/ThemeContext";

function MealPlannerPage() {
  const { getTheme } = useTheme();
  const currentTheme = getTheme();
  
  const pageBackgroundColor =`${currentTheme.secondary}`;

  return (
    <div className={`page-container ${pageBackgroundColor}`}>
      {/* Container for the MealPlanner component */}
      <div className="">
        <MealPlanner />
      </div>
    </div>
  );
}

export default MealPlannerPage;
