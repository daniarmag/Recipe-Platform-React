import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Modal from './Modal.js';
import { usePlanner } from '../context/PlannerContext';
import RecipesApi from '../api/RecipesApi.js';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const recipesPerPage = 8;
  const [selectedRecipe, setSelectedRecipe] = useState(null); // New state to store the selected recipe

  const { state, addRecipe } = usePlanner();

  useEffect(() => {
    // Assuming RecipeApi.getRecipes returns an array of recipes
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await RecipesApi.getRecipes();
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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddToPlanner = (recipe) => {
    setModalOpen(true);
    setSelectedRecipe(recipe); // Store the selected recipe in the state
  };

  const addToPlanner = (meal, recipe) => {
    addRecipe(meal,recipe);
  };

  return (
    <div>
      <div className="grid grid-cols-1 p-6 md:grid-cols-4 md:gap-8">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.name}
            imageSrc={recipe.image}
            description={recipe.description}
            ingredients={recipe.ingredients}
            nutritionalValues={recipe.nutritionalValues}
            preparation={recipe.preparation}
            onAddToPlanner={() => handleAddToPlanner(recipe)}
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

      {modalOpen && (
        <Modal
        recipe={selectedRecipe}
        addToPlanner={addToPlanner} // Pass the addToPlanner function directly
        closeModal={() => {
          setModalOpen(false);
          setSelectedRecipe(null);
        }}
      />
      )}
    </div>
  );
}

export default RecipeList;
