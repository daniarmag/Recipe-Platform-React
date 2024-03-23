import React, { useState } from "react";
import { usePlanner } from "../context/PlannerContext.js";
import ShoppingList from "./ShoppingList.js";

const createPlannerIdentifier = (categoryIndex, recipeIndex, recipeId) =>
  `${categoryIndex}:${recipeIndex}`;

function MealPlanner() {
  const { getMeals, removeRecipe } = usePlanner();

  const [ShoppingListOpen, setShoppingListOpen] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

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

  const toggleRecipeDetails = (categoryIndex, recipeIndex, recipeId) => {
    const identifier = createPlannerIdentifier(
      categoryIndex,
      recipeIndex,
      recipeId
    );
    setExpandedRow(expandedRow === identifier ? null : identifier);
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
    <div className="min-h-screen">
      <div className="text-xl">
        <div className="text-2xl font-bold text-center py-3 sm:test-3xl ">
          Plan your meals for the day
        </div>
        <div className="w-full flex items-center justify-center">
          <table className=" border border-gray-300 rounded shadow-md w-full ">
            <thead className="sm:table-header-group">
              <tr>
                <th className="py-2 px-4 text-left bg-gray-100">MEAL</th>
                <th className="py-2 px-4 text-left bg-gray-100">RECIPE</th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  INGREDIENTS
                </th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  CALORIES(kcal)
                </th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  PROTEINS(g)
                </th>
                <th className="py-2 px-4 text-left bg-gray-100 desktop-only">
                  FATS(g)
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
                          className="py-2 px-4"
                          rowSpan={
                            Object.values(meals[mealCategory]).length || 1
                          }
                        >
                          {mealCategory}
                        </td>
                      ) : null}

                      <td
                        className="py-2 text-md"
                        onClick={() =>
                          toggleRecipeDetails(categoryIndex, index)
                        }
                      >
                        <div>{recipe.name}</div>

                        {expandedRow ===
                          `${createPlannerIdentifier(
                            categoryIndex,
                            index,
                            recipe.id
                          )}` && (
                          <div>
                            <div className="py-2 px-4 mobile-only">
                              <span>
                                Ingredients:{" "}
                                <div>
                                  {recipe.ingredients.map(
                                    (ingredient, index) => (
                                      <div key={index}>{ingredient}</div>
                                    )
                                  )}
                                </div>
                              </span>
                            </div>
                            <div className="py-2 px-4 mobile-only">
                              <div>
                                Calories: {recipe.nutritionalValues.calories}
                              </div>
                              <div>
                                Proteins: {recipe.nutritionalValues.proteins}
                              </div>
                              <div>Fats: {recipe.nutritionalValues.fat}</div>
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
                      <td className="py-2 px-2 lg:w-3">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded font-bold "
                          onClick={() => handleDelete(mealCategory, recipe)}
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
            <tfoot className="desktop-only">
              <tr className="border border-gray-300">
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
          <div>Total Calories: {totals.calories}kcal</div>
          <div>Total Proteins: {totals.proteins}g</div>
          <div>Total Fats: {totals.fats}g</div>
          <button
            onClick={toggleShoppingList}
            className="mt-2 p-4 rounded-full border-2  shadow-lg bg-blue-100 hover:bg-blue-200  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <img
              src={imageUrl}
              alt="Shopping List"
              className="w-12  object-cover"
            />
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
