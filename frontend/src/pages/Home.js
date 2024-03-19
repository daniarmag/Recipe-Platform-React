import RecipeList from '../components/RecipesList';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import FeatureSection from '../components/FeatureSection';
function Home() {
  const {theme} = useTheme();

    return (  
      
      <div style={{ backgroundColor: theme[theme.darkMode].secondary }} className='min-h-screen'>
                <Navbar />
      <div className="flex flex-col items-center mx-auto mt-10 ">
        <h1 className="text-4xl font-bold mb-2 text-center ScularOneFont text-green-800">
           WELCOME TO OUR RECIPE SHARING & MEAL PLANNING PLATFORM
        </h1>
        <p className="text-lg text-center mt-5 mb-3">
            Browse through delicious recipes shared by our community.
        </p>
      </div>

        <SearchBar/>
        <RecipeList/>
        <Banner/>
        <FeatureSection/>
    </div>
    )

}

export default Home;

