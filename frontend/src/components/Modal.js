import React from 'react';

const Modal = ({ recipe, closeModal, addToPlanner }) => {
  const mealOptions = ["breakfast", "lunch", "dinner"];
  return (
    <div className="modal bg-white w-44 p-4 rounded-lg shadow-md fixed top-1/2 left-0">
      <button className="close-modal-btn absolute top-2 left-2 c text-black" onClick={closeModal}>
        x
      </button>

      <div className="text-center text-lg font-semibold title mb-2 top">
        {`Add ${recipe.name} to:`}
      </div>

      {mealOptions.map((meal) => (
        <button
          key={meal}
          className="meal-option-btn text-blue-500 py-1 px-2 mt-1 text-xs border border-blue-500 px-3 rounded-full w-full max-w-full text-ellipsis whitespace-no-wrap"
          onClick={() => {
            console.log(recipe)
            addToPlanner(meal, recipe);
            closeModal();
          }}
        >
          {meal.charAt(0).toUpperCase() + meal.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default Modal;
