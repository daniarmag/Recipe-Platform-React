
import React, { useState } from 'react';



const RecipeCard = ({ title, imageSrc, description, ingredients, nutritionalValues, preparation, onAddToPlanner }) => {
  const [currentPopupImg, setCurrentPopupImg] = useState(null);


  return (
    <div className="bg-white rounded-lg shadow-md hover:scale-110 transition duration-500 recipe-card">
    <div className="p-4 flex flex-col">
        <img src={imageSrc} alt={title} className="w-full h-64 object-cover rounded-md mb-4" />
        <div className="text-center text-lg font-semibold title mb-4">{title}</div>
        <p className="text-gray-600 text-s description flex-grow">{description}</p>
        <button
        className="add-to-planner-btn text-green-500 py-1 px-2 mt-4 text-xs border border-green-500 rounded-full w-full self-end"
        onClick={onAddToPlanner}>
        + Add to Planner
        </button>
    </div>
    </div>
  );
};

export default RecipeCard;
