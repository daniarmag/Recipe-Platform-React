import React, { useState, useEffect } from 'react';
import { usePlanner } from '../context/PlannerContext';

function ShoppingList({ selectedRecipes, onClose }) {

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    if (selectedRecipes) {
      const ingredients = [];

      Object.values(selectedRecipes).forEach((mealType) => {
        mealType.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            ingredients.push(ingredient);
          });
        });
      });

      setSelectedIngredients(ingredients);
    }
  }, [selectedRecipes]);

  const handleDownload = () => {
    const formattedIngredients = selectedIngredients.join('\n');

    const blob = new Blob([formattedIngredients], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'ingredients.txt';
    downloadLink.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 text-left max-w-md w-full max-h-[90vh] overflow-auto">
    <button
      onClick={onClose}
      className="absolute top-0 right-0 mr-1 text-gray-800 text-2xl font-bold bg-transparent cursor-pointer"
    >
      &times;
    </button>
    {selectedIngredients.map((ingredient, index) => (
      <div key={index} className="border-b py-2">
        <span className="text-lg">{ingredient}</span>
      </div>
    ))}
    <button
      onClick={handleDownload}
      className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
    >
      Download Shopping List
    </button>
  </div>
  );
}

export default ShoppingList;
