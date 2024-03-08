import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Define the initial state
const initialState = {
  meals: {
    breakfast: {},
    lunch: {},
    dinner: {},
  },
};

// Define the actions (add more as needed)
const actionTypes = {
  ADD_RECIPE: 'ADD_RECIPE',
  REMOVE_RECIPE: 'REMOVE_RECIPE',
};

// Define the reducer function
const plannerReducer = (state, action) => {
  const { mealCategory, recipe, recipeId } = action.payload;

  switch (action.type) {
    case actionTypes.ADD_RECIPE:
      return {
        ...state,
        meals: {
          ...state.meals,
          [mealCategory]: {
            ...state.meals[mealCategory],
            [recipe.id]: recipe,
          },
        },
      };
    case actionTypes.REMOVE_RECIPE: {
      const updatedMeals = { ...state.meals };
      delete updatedMeals[mealCategory][recipeId];
      return {
        ...state,
        meals: updatedMeals,
      };
    }
    default:
      return state;
  }
};

// Create the context
const PlannerContext = createContext();

// Create a provider component
export const PlannerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(plannerReducer, initialState);

  // Define functions to dispatch actions
  const addRecipe = (mealCategory, recipe) => {
    dispatch({
      type: actionTypes.ADD_RECIPE,
      payload: { mealCategory, recipe },
    });
  };

  const removeRecipe = (mealCategory, recipeId) => {
    dispatch({ type: actionTypes.REMOVE_RECIPE, payload: { mealCategory, recipeId } });
  };

  const getMeals = () => {
    return state.meals;
  };

  // Log the state after it has been updated
  useEffect(() => {
    console.log(state);
  }, [state]);

  // Provide the state and functions to the children components
  return (
    <PlannerContext.Provider value={{ state, getMeals, addRecipe, removeRecipe }}>
      {children}
    </PlannerContext.Provider>
  );
};

// Create a custom hook to use the context
export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
