import React, { createContext, useContext, useReducer, useEffect } from "react";

// Define the initial state
const initialState = {
  meals: {
    breakfast: {},
    lunch: {},
    dinner: {},
  },
  shoppingList: {},
};

const actionTypes = {
  ADD_RECIPE: "ADD_RECIPE",
  REMOVE_RECIPE: "REMOVE_RECIPE",
  UPDATE_SHOPPING_LIST: "UPDATE_SHOPPING_LIST",
};

// Define the reducer function
const plannerReducer = (state, action) => {
  const { mealCategory, recipe, recipeId, ingredientName } = action.payload;

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
    case actionTypes.UPDATE_SHOPPING_LIST: {
      return {
        ...state,
        shoppingList: {
          ...state.shoppingList,
          [ingredientName]: action.payload.amount,
        },
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
  const getMeals = () => {
    return state.meals;
  };

  //

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
  //

  // Log the state after it has been updated
  useEffect(() => {
    // console.log(state);
  }, [state]);

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

// Create a custom hook to use the context
export const usePlanner = () => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error("usePlanner must be used within a PlannerProvider");
  }
  return context;
};
