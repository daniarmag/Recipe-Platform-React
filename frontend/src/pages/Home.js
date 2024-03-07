import { useEffect } from 'react'
import RecipeList from '../components/RecipesList';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';


function Home() {
    return (
        <>
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mt-2 mb-2 bigTitle">
            Welcome To Our Recipe Sharing & Meal Planning Platform
          </h1>
          <p className="text-lg">
            Browse through delicious recipes shared by our community.
          </p>
      </div>
      <div>

      </div>
    <SearchBar/>
    <RecipeList/>
    <Banner/>
    
    </>
    )

}

export default Home;

