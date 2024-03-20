import React, { useState } from "react";
import { usePlanner } from "../context/PlannerContext.js";
import ShoppingList from "./ShoppingList.js";

function MealPlanner() {
  const { getMeals, removeRecipe } = usePlanner();

  const [ShoppingListOpen, setShoppingListOpen] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState(null);
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);

  const meals = getMeals();

  const toggleShoppingList = () => {
    setShoppingListOpen(!ShoppingListOpen);
    setSelectedRecipes(meals);
  };

  const calculateTotals = () => {
    const totals = {
      calories: 0,
      proteins: 0,
      fats: 0,
    };

    Object.keys(meals).forEach((mealCategory) => {
      Object.values(meals[mealCategory]).forEach((recipe) => {
        totals.calories += +recipe.nutritionalValues.calories || 0;
        totals.proteins += +recipe.nutritionalValues.proteins || 0;
        totals.fats += +recipe.nutritionalValues.fat || 0;
      });
    });
    return totals;
  };

  const handleDelete = async (mealCategory, recipe) => {
    try {
      await removeRecipe(mealCategory, recipe.id);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const toggleRecipeDetails = (recipeId) => {
    setExpandedRecipeId(expandedRecipeId === recipeId ? null : recipeId);
  };

  const totals = calculateTotals();

  const getCategoryColor = (category) => {
    const categoryColorMap = {
      Breakfast: "bg-green-200",
      Lunch: "bg-green-100",
      Dinner: "bg-green-50",
    };
    return categoryColorMap[category] || "bg-gray-200";
  };
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/webproject-58141.appspot.com/o/recipeImages%2Fadd-to-cart.png?alt=media&token=1b4dd764-7ad4-45d1-9f76-3d8c5c94d061";
  console.log(meals);

  return (
    <div className="px-2 min-h-screen">
      <div className="text-xl px-2">
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded shadow-md">
            <thead className="sm:table-header-group">
              <tr>
                <th className="py-2 px-4 text-left bg-gray-100">MEAL</th>
                <th className="py-2 px-4 text-left bg-gray-100">RECIPE</th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  INGREDIENTS
                </th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  CALORIES
                </th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  PROTEINS
                </th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  FATS
                </th>
                <th className="py-2 px-4 text-left bg-gray-100">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(meals).map((mealCategory, categoryIndex) =>
                Object.values(meals[mealCategory]).map((recipe, index) => (
                  <React.Fragment key={recipe.id}>
                    <tr
                      className={`border-t border-gray-300 ${getCategoryColor(
                        mealCategory
                      )}`}
                    >
                      {index === 0 ? (
                        <td
                          className="py-2 px-4 font-bold"
                          rowSpan={
                            Object.values(meals[mealCategory]).length || 1
                          }
                        >
                          {mealCategory}
                        </td>
                      ) : null}

                      <td
                        className="py-2 px-4"
                        onClick={() => toggleRecipeDetails(recipe.id)}
                      >
                        <div>{recipe.name}</div>
                        {expandedRecipeId === recipe.id && (
                          <div>
                            <div className="py-2 px-4 mobile-only">
                              <span>
                                <u>Ingredients</u>:{" "}
                                {recipe.ingredients.join(", ")}
                              </span>
                            </div>
                            <div className="py-2 px-4 mobile-only">
                              <span>
                                Calories: {recipe.nutritionalValues.calories}
                                kacl
                              </span>
                              <span>
                                Proteins: {recipe.nutritionalValues.proteins}g
                              </span>
                              <span>Fats: {recipe.nutritionalValues.fat}g</span>
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="py-2 px-4 desktop-only">
                        {recipe.ingredients.join(", ")}
                      </td>
                      <td className="py-2 px-4 desktop-only">
                        {recipe.nutritionalValues.calories}
                      </td>
                      <td className="py-2 px-4 desktop-only">
                        {recipe.nutritionalValues.proteins}
                      </td>
                      <td className="py-2 px-4 desktop-only">
                        {recipe.nutritionalValues.fat}
                      </td>
                      <td className="py-2 px-4 lg:w-3">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded font-bold "
                          onClick={() => handleDelete(mealCategory, recipe)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                    {/* {expandedRecipeId == recipe.id && (
                      <>
                        <tr className="py-2 px-4 mobile-only">
                          <td colSpan="3">
                            - <u>Ingredients</u>:{" "}
                            {recipe.ingredients.join(", ")}
                          </td>
                        </tr>
                        <tr className="py-2 px-4 mobile-only">
                          <td>Calories: {recipe.nutritionalValues.calories}</td>
                          <td>Proteins: {recipe.nutritionalValues.proteins}</td>
                          <td>Fats: {recipe.nutritionalValues.fat}</td>
                        </tr>
                      </>
                    )} */}
                  </React.Fragment>
                ))
              )}
            </tbody>
            <tfoot className="desktop-only">
              <tr>
                <td className="py-2 px-4 text-left bg-gray-100" colSpan={3}>
                  TOTALS
                </td>
                <td className="py-2 px-4 text-left bg-gray-100">
                  {totals.calories}
                </td>
                <td className="py-2 px-4 text-left bg-gray-100">
                  {totals.proteins}
                </td>
                <td className="py-2 px-4 text-left bg-gray-100">
                  {totals.fats}
                </td>
                <td className="py-2 pl-8 bg-gray-100">
                  <button onClick={toggleShoppingList}>
                    <img
                      src={imageUrl}
                      alt="Shopping List"
                      style={{ width: "24px", height: "24px" }}
                    />
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        {/* Totals for Mobile */}
        <div className="mobile-only text-center my-4">
          <div>Total Calories: {totals.calories}</div>
          <div>Total Proteins: {totals.proteins}</div>
          <div>Total Fats: {totals.fats}</div>
          <button onClick={toggleShoppingList} className="mt-2">
            <img src={imageUrl} alt="Shopping List" />
          </button>
        </div>
        {ShoppingListOpen && selectedRecipes && (
          <ShoppingList
            selectedRecipes={selectedRecipes}
            onClose={toggleShoppingList}
          />
        )}
      </div>
    </div>
  );
}

export default MealPlanner;
