import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Modal from './Modal.js';
import RecipePopup from './RecipePopup.js'
import { useRecipes } from '../context/RecipesContext'; // Update the import
import { usePlanner } from '../context/PlannerContext';

function RecipeList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const recipesPerPage = 8;
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { state, addRecipe } = usePlanner();
  const { recipes, fetchRecipes } = useRecipes(); // Use the useRecipes hook

  useEffect(() => {
    // Fetch recipes from the context
    fetchRecipes();
  }, [fetchRecipes]);

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
    setSelectedRecipe(recipe);
  };

  const addToPlanner = (meal, recipe) => {
    window.alert(`Recipe ${recipe.name} added to ${meal}`);


    
    addRecipe(meal, recipe);
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
          addToPlanner={addToPlanner}
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
