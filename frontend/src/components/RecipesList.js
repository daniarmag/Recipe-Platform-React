import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import Modal from './Modal.js';
import RecipePopup from './RecipePopup.js'
import { useRecipes } from '../context/RecipesContext'; // Update the import
import { usePlanner } from '../context/PlannerContext';
import { useTheme } from '../context/ThemeContext';


function RecipeList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipeForPopup, setSelectedRecipeForPopup] = useState(null);
  
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const { state, addRecipe } = usePlanner();
  const { recipes, page, totalPages, loading, error, fetchRecipes, updatePage } = useRecipes();

  useEffect(() => {
    // Fetch recipes from the context
    fetchRecipes();
  }, [fetchRecipes]);


  const paginate = (pageNumber) => {
    // Update the page in the context
    updatePage(pageNumber);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const openPopup = (recipe) => {
    setSelectedRecipeForPopup(recipe);
  };

  const closePopup = () => {
    setSelectedRecipeForPopup(null);
  };

  const handleAddToPlanner = (recipe) => {
    setModalOpen(true);
    setSelectedRecipe(recipe);
  };

  const addToPlanner = (meal, recipe) => {
    window.alert(`Recipe ${recipe.name} added to ${meal}`);
    addRecipe(meal, recipe);
  };

  const { theme } = useTheme();
  const { darkMode } = theme;

  const nextPrevStyles = {
    backgroundColor:darkMode === 'dark' ?'#1A202C' : '#48BB78',
  };
 
  return (
    <div>
      <div className="grid grid-cols-1 p-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:grid-cols-2">
        {recipes?.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.name}
            imageSrc={recipe.image}
            description={recipe.description}
            ingredients={recipe.ingredients}
            nutritionalValues={recipe.nutritionalValues}
            preparation={recipe.preparation}
            onAddToPlanner={() => handleAddToPlanner(recipe)}
            onOpenPopup={() => openPopup(recipe)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {page > 1 && (
          <button
            onClick={() => paginate(page - 1)}
            className="mr-2 px-4 py-2 text-white rounded shadow-md hover:bg-green-500"
            style={nextPrevStyles}
          >
            Prev
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => paginate(page + 1)}
            className="px-4 py-2 text-white rounded shadow-md hover:bg-green-500"
            style={nextPrevStyles}
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
      {selectedRecipeForPopup && (
        <RecipePopup
          title={selectedRecipeForPopup.name}
          imageSrc={selectedRecipeForPopup.image}
          description={selectedRecipeForPopup.description}
          ingredients={selectedRecipeForPopup.ingredients}
          nutritionalValues={selectedRecipeForPopup.nutritionalValues}
          preparation={selectedRecipeForPopup.preparation}
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export default RecipeList;
