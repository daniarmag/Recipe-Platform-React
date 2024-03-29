import React from "react";

/*
 * Modal component for adding a recipe to the meal planner.
 */
const Modal = ({ recipe, closeModal, addToPlanner }) => {
  const mealOptions = ["Breakfast", "Lunch", "Dinner"];
  return (
    <div className="modal-container">
      <div className="modal bg-white p-4 rounded-lg shadow-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mr-1 text-gray-800 text-2xl font-bold bg-transparent cursor-pointer"
        >
          &times;
        </button>

        <div className="text-center text-lg font-bold title mb-2 top">
          {`Add ${recipe.name} to:`}
        </div>

        {mealOptions.map((meal) => (
          <button
            key={meal}
            className="meal-option-btn text-green-500 py-1  mt-1 text-s border border-green-500 px-3 rounded-full w-full max-w-full text-ellipsis whitespace-no-wrap AssistantFont font-semibold"
            onClick={() => {
              console.log(recipe);
              addToPlanner(meal, recipe);
              closeModal();
            }}
          >
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Modal;
