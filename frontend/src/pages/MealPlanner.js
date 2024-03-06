import React from 'react';

const MealPlanner = () => {
  return (
    <div className="text-xl font-bold px-2">
      <div className="text-xl font-bold px-2">
        <div className="text-2xl font-bold text-center py-3 bigTitle sm:text-3xl">
          Plan your meals for the day
        </div>
        <table className="overflow-x-auto w-full border border-gray-300 rounded shadow-md">
          <thead>
            <tr>
              {['Meal', 'Recipe', 'Ingredients', 'Calories', 'Proteins', 'Fats', 'Actions'].map((columnText, index) => (
                <th key={index} className="py-2 px-4 text-left bg-gray-100">
                  {columnText}
                </th>
              ))}
            </tr>
          </thead>
          {/* Add your table body content here */}
        </table>
      </div>
    </div>
  );
};

export default MealPlanner;
