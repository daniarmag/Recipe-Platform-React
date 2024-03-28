import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define the initial state
const initialState = {
  meals: {
    Breakfast: {},
    Lunch: {},
    Dinner: {},
  },
  shoppingList: {},
};

// Define action types
const actionTypes = {
  ADD_RECIPE: "ADD_RECIPE",
  REMOVE_RECIPE: "REMOVE_RECIPE",
  UPDATE_SHOPPING_LIST: "UPDATE_SHOPPING_LIST",
};

// Define the reducer function
const plannerReducer = (state, action) => {
  const { mealCategory, recipe, recipeId, ingredientName } = action.payload;
  // Switch statement to handle different action types
  switch (action.type) {
    case actionTypes.ADD_RECIPE:
      // Return a new state object with the added recipe under the specified meal category
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
    // Case for removing a recipe from a meal category
    case actionTypes.REMOVE_RECIPE: {
      const updatedMeals = { ...state.meals };
      // Remove the specified recipe from the meal category
      delete updatedMeals[mealCategory][recipeId];
      return {
        ...state,
        meals: updatedMeals,
      };
    }
    // Case for updating the shopping list
    case actionTypes.UPDATE_SHOPPING_LIST: {
      return {
        ...state,
        shoppingList: {
          ...state.shoppingList,
          [ingredientName]: action.payload.amount,
        },
      };
    }
    // Default case returns the current state if action type is not recognized
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
  const addRecipeToPlanner = (mealCategory, recipe) => {
    dispatch({
      type: actionTypes.ADD_RECIPE,
      payload: { mealCategory, recipe },
    });
  };

  const removeRecipe = (mealCategory, recipeId) => {
    dispatch({
      type: actionTypes.REMOVE_RECIPE,
      payload: { mealCategory, recipeId },
    });
  };

  const updateShoppingList = (ingredientName, amount) => {
    dispatch({
      type: actionTypes.UPDATE_SHOPPING_LIST,
      payload: { ingredientName, amount },
    });
  };
  // Function to get meals
  const getMeals = () => {
    return state.meals;
  };

  // Function to get shopping list
  const getShoppingList = (selectedRecipes) => {
    let shoppingList = {};

    if (selectedRecipes) {
      Object.keys(selectedRecipes).forEach((mealType) => {
        Object.values(selectedRecipes[mealType]).forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            if (!shoppingList[ingredient]) {
              shoppingList[ingredient] = 1;
            } else {
              shoppingList[ingredient] += 1;
            }
          });
        });
      });
    }

    return shoppingList;
  };

  // Log the state after it has been updated
  useEffect(() => {  }, [state]);

  // Provide the state and functions to the children components
  return (
    // <PlannerContext.Provider value={{ state, getMeals, addRecipe, removeRecipe  }}>
    <PlannerContext.Provider
      value={{
        state,
        getMeals,
        addRecipeToPlanner,
        removeRecipe,
        getShoppingList,
        updateShoppingList,
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

// Custom hook to use the planner context
export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error("usePlanner must be used within a PlannerProvider");
  }
  return context;
};
