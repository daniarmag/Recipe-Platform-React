import React, { useState, useEffect } from 'react';
import { usePlanner } from '../context/PlannerContext';

function ShoppingCart({ selectedRecipes, onClose }) {
  const { getMeals } = usePlanner();
  const [selectedGroceries, setSelectedGroceries] = useState([]);

  useEffect(() => {
    if (selectedRecipes) {
      const groceries = [];

      Object.values(selectedRecipes).forEach((mealType) => {
        mealType.forEach((recipe) => {
          groceries.push({
            label: recipe.ingredients.join(','),
            quantity: 1,
            isChecked: false,
          });
        });
      });

      setSelectedGroceries(groceries);
    }
  }, [selectedRecipes]);

  const handleDownload = () => {
    const formattedGroceries = selectedGroceries
      .filter((item) => item.isChecked)
      .map(({ label, quantity }) => `${label}: ${quantity}`)
      .join('\n');

    const blob = new Blob([formattedGroceries], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'groceries.txt';
    downloadLink.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCheckboxChange = (index) => {
    const updatedGroceries = [...selectedGroceries];
    updatedGroceries[index].isChecked = !updatedGroceries[index].isChecked;
    setSelectedGroceries(updatedGroceries);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg z-50 text-left max-w-md w-full max-h-[90vh] overflow-auto">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 mr-1 text-gray-800 text-2xl font-bold bg-transparent cursor-pointer"
      >
        &times;
      </button>
      {selectedGroceries.map((item, index) => (
        <div key={index} className="flex items-center justify-between border-b py-2">
          <span className="text-lg flex-grow">{item.label}</span>
          <input
            type="number"
            value={item.quantity}
            min={1}
            onChange={(e) => {
              const updatedGroceries = [...selectedGroceries];
              updatedGroceries[index].quantity = parseInt(e.target.value, 10);
              setSelectedGroceries(updatedGroceries);
            }}
            className="form-input text-center w-16"
          />
          <input
            type="checkbox"
            checked={item.isChecked}
            onChange={() => handleCheckboxChange(index)}
            className="form-checkbox h-5 w-5 text-green-600 ml-4"
          />
        </div>
      ))}
      <button
        onClick={() => handleDownload()}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Download Groceries
      </button>
    </div>
  );
}

export default ShoppingCart;
