import React from 'react';

const RecipePopup = ({ title, imageSrc, description, ingredients, nutritionalValues, preparation, onClose }) => {

    
  const unitMap = {
    fat: 'g',
    proteins: 'g',
    calories: 'kcal'
  };

  const sortedKeys = Object.keys(nutritionalValues).sort(
    (a, b) => ['fat', 'proteins', 'calories'].indexOf(a) - ['fat', 'proteins', 'calories'].indexOf(b)
  );

  return (
<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg z-50 text-center w-10/12 max-w-md mx-auto sm:w-3/5 md:w-3/5 lg:w-1/2 xl:w-1/3 max-h-[22]  popup">
      <button onClick={onClose} className="absolute top-2 left-2">
        <span className="text-stone-900 font-extrabold text-2xl bg-slate-200 rounded cursor-pointer">&times;</span>
      </button>
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover rounded-lg mb-1" />
      <h2 className="text-lg font-semibold mb-1">{title}</h2>
      <p className="text-gray-600 font-normal mb-1">{description}</p>
      <div className="text-left mb-2">
        <h3 className="text-gray-800 text-md font-semibold">Ingredients</h3>
        <p>{ingredients.join(', ')}</p>
      </div>
      <div className="text-left mb-2">
        <h3 className="text-gray-800 text-md font-semibold">Nutritional Values</h3>
        <ul>
          {sortedKeys.map((key) => (
            <li key={key}>
              {`${key}: ${nutritionalValues[key]}${unitMap[key]}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-left mb-4">
        <h3 className="text-gray-800 text-md font-semibold mb-1">Preparation</h3>
        <pre style={{ maxWidth: '100%', overflowX: 'auto' }}>{preparation}</pre>
      </div>
    </div>
  );
};

export default RecipePopup;