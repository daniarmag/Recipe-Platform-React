import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import { getRecipesFromDB } from '../api/recipesApi';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getRecipesFromDB();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('Error fetching recipes: ', error);
      }
    };

    fetchRecipes();
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="grid grid-cols-1 p-6 md:grid-cols-4 md:gap-8">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            imageSrc={recipe.image}
            description={recipe.description}
            ingredients={recipe.ingredients}
            nutritionalValues={recipe.nutritionalValues}
            preparation={recipe.preparation}
            openModal={(title, ingredients, nutritionalValues) => {
              console.log('Recipe added to planner:', title, ingredients, nutritionalValues);
            }}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {currentPage > 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            className="mr-2 px-4 py-2 bg-green-400 text-white rounded shadow-md hover:bg-green-500"
          >
            Prev
          </button>
        )}
        {indexOfLastRecipe < recipes.length && (
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 bg-green-400 text-white rounded shadow-md hover:bg-green-500"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
