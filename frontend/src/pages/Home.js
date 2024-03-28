import RecipeList from "../components/RecipesList";
import Banner from "../components/Banner";
import SearchBar from "../components/SearchBar";
import { useTheme } from "../context/ThemeContext";

import FeatureSection from "../components/FeatureSection";
import TopChefs from "../components/TopChefs";

// Component for the home page
function Home() {
  // Access the theme from the theme context 
  const { theme } = useTheme();

  return (
    <div
      style={{ backgroundColor: theme[theme.darkMode].secondary }}
      className="page-container"
    >
      <div className="flex flex-col items-center mx-auto pt-8">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-700 ScularOneFont">
          WELCOME TO OUR RECIPE SHARING & MEAL PLANNING PLATFORM
        </h1>
        <p className="text-lg text-center mt-5 mb-3">
          Browse through delicious recipes shared by our community.
        </p>
      </div>

      <SearchBar />
      <RecipeList />
      <Banner />
      <TopChefs />
      <FeatureSection />
    </div>
  );
}

export default Home;
