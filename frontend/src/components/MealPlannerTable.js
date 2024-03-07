import React, { useState } from 'react';

function MealPlanner ()  {
  const [mealData, setMealData] = useState([]);

  const calculateTotals = () => {
    const totals = {
      calories: 0,
      proteins: 0,
      fats: 0,
    };

    mealData.forEach((meal) => {
      totals.calories += meal.calories || 0;
      totals.proteins += meal.proteins || 0;
      totals.fats += meal.fats || 0;
    });

    return totals;
  };

  const handleDelete = (index) => {
    const updatedMealData = [...mealData];
    updatedMealData.splice(index, 1);
    setMealData(updatedMealData);
  };

  const handleAddSample = () => {
    const sampleMeal = {
      mealName: 'Sample Meal',
      recipe: 'Sample Recipe',
      ingredients: 'Sample Ingredients',
      calories: 300,
      proteins: 20,
      fats: 10,
    };

    setMealData([...mealData, sampleMeal]);
  };

  const totals = calculateTotals();

  return (
    <div className="text-xl font-bold px-2 mb-10">
      <div className="text-xl font-bold px-2">
        <div className="text-2xl font-bold text-center py-3 bigTitle sm:text-3xl">
          Plan your meals for the day
        </div>
        <button className="bg-blue-500 text-white px-2 py-1 mb-2 rounded" onClick={handleAddSample}>
          Add Sample
        </button>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded shadow-md">
            <thead className="hidden sm:table-header-group">
              <tr>
                {['Meal', 'Recipe', 'Ingredients', 'Calories', 'Proteins', 'Fats', 'Actions'].map((columnText, index) => (
                  <th key={index} className="py-2 px-4 text-left bg-gray-100">
                    {columnText}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mealData.map((meal, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="py-2 px-4" data-label="Meal">
                    {meal.mealName}
                  </td>
                  <td className="py-2 px-4" data-label="Recipe">
                    {meal.recipe}
                  </td>
                  <td className="py-2 px-4" data-label="Ingredients">
                    {meal.ingredients}
                  </td>
                  <td className="py-2 px-4" data-label="Calories">
                    {meal.calories}
                  </td>
                  <td className="py-2 px-4" data-label="Proteins">
                    {meal.proteins}
                  </td>
                  <td className="py-2 px-4" data-label="Fats">
                    {meal.fats}
                  </td>
                  <td className="py-2 px-4" data-label="Actions">
                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="hidden sm:table-footer-group">
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
                <td className="py-2 px-4 text-left bg-gray-100"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
