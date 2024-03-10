// Import the MealPlanner component
import MealPlanner from '../components/MealPlannerTable';
import { useTheme } from '../context/ThemeContext';


// Your MealPlanner page component
function MealPlannerPage() {
  const { theme } = useTheme();
  const { darkMode } = theme;

  const pageBackgroundColor = darkMode === 'dark' ? 'DarkGray' : 'GhostWhite';


  return (
    <div style={{ backgroundColor: pageBackgroundColor }}>
      {/* Include the MealPlanner component */}
      <MealPlanner />
    </div>
  );
};

export default MealPlannerPage;
