import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';



const RecipeCard = ({ title, imageSrc, description, ingredients, nutritionalValues, preparation, onAddToPlanner, onOpenPopup }) => {
  // const [currentPopupImg, setCurrentPopupImg] = useState(null);
  const { theme } = useTheme();
  const { darkMode } = theme;

  const cardStyle = {
    backgroundColor: darkMode === 'dark' ? theme.dark.card : theme.light.card,
    color: darkMode === 'dark' ? '#FFFFFF' : '#333333', 
  };

  const addToPlannerBtnStyle = {
    border: darkMode === 'dark' ? 'green-200' : 'gray-500', // Use green for dark mode, gray for light mode
    text: darkMode === 'dark' ? 'white' : 'green-500', // Use white for dark mode, green for light mode
  };
  

  return (
      <div className="bg-white rounded-lg shadow-md border-2 my-2 hover:scale-105 transition duration-200 recipe-card" style={cardStyle}>
        <div className="p-4 flex flex-col h-full"> {/* Set height to full for the flex container */}
        
          <img src={imageSrc} alt={title} className="w-full h-64 object-cover rounded-md mb-2" 
              onClick={() => onOpenPopup({ title, imageSrc, description, ingredients, nutritionalValues, preparation })}
          />
          <div className="text-center text-lg font-semibold title mb-2">{title}</div>
          <p className="text-s description flex-grow mb-2">{description}</p>
          
          <button
            className={`add-to-planner-btn text-${addToPlannerBtnStyle.text} py-1 px-2 text-xs border border-${addToPlannerBtnStyle.border} rounded-full`}
            onClick={onAddToPlanner}>
            + Add to Planner
          </button>
        </div>
      </div>
  );
};

export default RecipeCard;