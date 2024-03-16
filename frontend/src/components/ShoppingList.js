import React, { useState } from 'react';
import { usePlanner } from '../context/PlannerContext';

function ShoppingList({ selectedRecipes, onClose }) {
  const { getShoppingList, updateShoppingList } = usePlanner();
  const initialShoppingList = getShoppingList(selectedRecipes);
  const [shoppingList, setShoppingList] = useState(initialShoppingList);

  const handleAmountChange = (ingredient, event) => {
    const updatedShoppingList = {
      ...shoppingList,
      [ingredient]: +event.target.value,
    };
    setShoppingList(updatedShoppingList);
    updateShoppingList(ingredient, +event.target.value);
  };

  const handleCheckboxChange = (ingredient) => {
    const updatedShoppingList = {
      ...shoppingList,
      [ingredient]: shoppingList[ingredient] ? 0 : initialShoppingList[ingredient], 
    };
    setShoppingList(updatedShoppingList);
    const toggledAmount = updatedShoppingList[ingredient] === 0 ? initialShoppingList[ingredient] : 0;
    updateShoppingList(ingredient, toggledAmount);
  };

  const handleDownload = () => {
    const formattedIngredients = Object.entries(shoppingList)
      .map(([ingredient, amount]) => {
        if (amount > 0) {
          return `${ingredient}: ${amount}`;
        }
        return null;
      })
      .filter(Boolean) // Remove null values
      .join('\n');

    const blob = new Blob([formattedIngredients], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'shopping_list.txt';
    downloadLink.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div

    className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 text-left max-w-md w-full max-h-[90vh] overflow-auto `}
  >
     <button onClick={onClose} className="absolute top-0 right-0 mr-1 text-gray-800 text-2xl font-bold bg-transparent cursor-pointer">
        &times;
      </button>
      {Object.entries(shoppingList).map(([ingredient, amount]) => (
        <div key={ingredient} className="flex items-center justify-between border-b py-2">
          <div>
            <input
              type="checkbox"
              checked={amount > 0}
              onChange={() => handleCheckboxChange(ingredient)}
              className="mr-2"
            />
            <span className={`text-lg ${amount ? '' : 'line-through text-gray-500'}`}>{ingredient}</span>
          </div>
          
          <div className="relative flex">
            <button
              type="button"
              onClick={() => handleAmountChange(ingredient, { target: { value: Math.max(0, parseInt(amount) - 1) } })}
              className="w-8 h-8 flex justify-center items-center bg-gray-100 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 rounded-l"
              data-input-counter-decrement
            >
              -
            </button>
            <input
              type="number"
              value={amount}
              onChange={(e) => handleAmountChange(ingredient, e)}
              min="0"
              step="1"
              className="w-16 text-center py-1 px-2 leading-tight appearance-none rounded-none focus:outline-none focus:shadow-outline border border-gray-300"
            />
            <button
              type="button"
              onClick={() => handleAmountChange(ingredient, { target: { value: parseInt(amount) + 1 } })}
              className="w-8 h-8 flex justify-center items-center bg-gray-100 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 rounded-r"
              data-input-counter-increment
            >
              +
            </button>
          </div>
        </div>
      ))}
      <button onClick={handleDownload} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Download Shopping List
      </button>
    </div>
  );
}

export default ShoppingList;
