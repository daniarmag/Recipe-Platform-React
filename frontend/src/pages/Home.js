import { useEffect } from 'react'
import RecipeList from '../components/RecipesList';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import { useTheme } from '../context/ThemeContext';

function Home() {
  const {theme} = useTheme();

    return (  
      <div style={{ backgroundColor: theme[theme.darkMode].secondary }}>
        <div className="flex flex-col items-center ">
          <h1 className="text-4xl font-bold mt-2 mb-2">
            Welcome To Our Recipe Sharing & Meal Planning Platform
          </h1>
          <p className="text-lg">
            Browse through delicious recipes shared by our community.
          </p>
        </div>
      
        <SearchBar/>
        <RecipeList/>
        <Banner/>
    </div>
    )

}

export default Home;

