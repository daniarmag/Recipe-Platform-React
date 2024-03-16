import React, { useEffect, useState } from 'react';
import { usePlanner } from '../context/PlannerContext.js'; 
import ShoppingList from './ShoppingList.js';

function MealPlanner() {
  const { getMeals, removeRecipe } = usePlanner();

  const [ShoppingListOpen, setShoppingListOpen] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState(null);

  const meals = getMeals();

  const toggleShoppingList = () => {
    setShoppingListOpen(!ShoppingListOpen);
    setSelectedRecipes(meals);
  };
  
  const calculateTotals = () => {
    const totals = {
      calories: 0,
      proteins: 0,
      fats: 0,
    };

    Object.keys(meals).forEach((mealCategory) => {
      Object.values(meals[mealCategory]).forEach((recipe) => {


        totals.calories += +recipe.nutritionalValues.calories || 0;
        totals.proteins += +recipe.nutritionalValues.proteins || 0;
        totals.fats += +recipe.nutritionalValues.fat || 0;
      });
    });
    return totals;
  };

  const handleDelete = async (mealCategory, recipe) => {
    try {
      await removeRecipe(mealCategory, recipe.id);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Handle errors as needed
    }
  };

  const totals = calculateTotals();

  const getCategoryColor = (category) => {
    // Define a mapping of categories to colors
    const categoryColorMap = {
      breakfast: 'bg-green-100',
      lunch: 'bg-gray-200',
      dinner: 'bg-green-100',
      // Add more categories and colors as needed
    };
  
    // Return the color based on the category or a default color
    return categoryColorMap[category] || 'bg-gray-200';
  };

  const imageUrl = 'https://firebasestorage.googleapis.com/v0/b/webproject-58141.appspot.com/o/recipeImages%2Fadd-to-cart.png?alt=media&token=1b4dd764-7ad4-45d1-9f76-3d8c5c94d061';
  
  return (
    <div className="text-xl font-bold px-2 min-h-screen">
      <div className="text-xl font-bold px-2">
        <div className="text-2xl font-bold text-center py-3 bigTitle sm:text-3xl">
          Plan your meals for the day
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded shadow-md">
            <thead className="sm:table-header-group">
              <tr>
                {['Meal', 'Recipe', 'Ingredients', 'Calories', 'Proteins', 'Fats', 'Actions'].map((columnText, index) => (
                  <th key={index} className="py-2 px-4 text-left bg-gray-100">
                    {columnText}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(meals).map((mealCategory) => (
                Object.values(meals[mealCategory]).map((recipe, index) => (
                  <tr key={index} className={`border-t border-gray-300 ${getCategoryColor(mealCategory)}`}>
                    {index === 0 ? (
                      <td className="py-2 px-4" rowSpan={Object.values(meals[mealCategory]).length} data-label="Meal">
                        {mealCategory}
                      </td>
                    ) : null}
                    <td className="py-2 px-4" data-label="Recipe Name">
                      {recipe.name}
                    </td>
                    <td className="py-2 px-4" data-label="Ingredients">
                      {recipe.ingredients.join(',')}
                    </td>
                    <td className="py-2 px-4" data-label="Calories">
                      {recipe.nutritionalValues.calories}
                    </td>
                    <td className="py-2 px-4" data-label="Proteins">
                      {recipe.nutritionalValues.proteins}
                    </td>
                    <td className="py-2 px-4" data-label="Fats">
                      {recipe.nutritionalValues.fat}
                    </td>
                    <td className="py-2 px-4" data-label="Actions">
                      <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(mealCategory, recipe)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ))}
            </tbody>

            <tfoot className="border-t-2 sm:table-footer-group">
              <tr>
                <td className="py-2 px-4 text-left bg-gray-100" colSpan={3}>
                  Totals
                </td>
                <td className="py-2 px-4 text-left bg-gray-100" data-label="Calories">
                  {totals.calories}
                </td>
                <td className="py-2 px-4 text-left bg-gray-100" data-label="Proteins">
                  {totals.proteins}
                </td>
                <td className="py-2 px-4 text-left bg-gray-100" data-label="Fats">
                  {totals.fats}
                </td>
                <td className="py-2 pl-8 bg-gray-100">
                {ShoppingListOpen && selectedRecipes && (
                  <ShoppingList selectedRecipes={selectedRecipes} onClose={toggleShoppingList} />
                )}
                  <button onClick={toggleShoppingList}>
                    <img src={imageUrl} alt="Shopping List" style={{ width: '24px', height: '24px' }} />
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
  </div>
  );
}

export default MealPlanner;