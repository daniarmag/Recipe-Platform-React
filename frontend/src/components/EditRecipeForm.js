import React, { useState, useEffect } from "react";
import RecipesApi from "../api/RecipesApi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import usePopupMessage from "../hooks/usePopupMessage.js";
import PopupMessage from "./PopupMessage.js";

const EditRecipeForm = ({ recipeId }) => {
 
  const [recipeData, setRecipeData] = useState(null);
  const { isVisible: isPopupVisible, message, showPopup } = usePopupMessage(); // Use the custom hook for popup message
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    // Fetch the recipe data using the recipeId
    const fetchRecipe = async () => {
      try {
        const response = await RecipesApi.getRecipeById(recipeId);
        setRecipeData(response);
        if (response.image) {
          // Directly use the URL/path if it's suitable for an <img> tag's src attribute
          setImagePreviewUrl(response.image);
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
        // Handle error
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id.includes("nutritionalValues.")) {
      const key = id.split(".")[1];
      setRecipeData({
        ...recipeData,
        nutritionalValues: { ...recipeData.nutritionalValues, [key]: value },
      });
    } else {
      setRecipeData({ ...recipeData, [id]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRecipeData({ ...recipeData, image: file });

      // Set file reader to read the image file as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update the state with the image preview URL
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("author", recipeData.author);
    formData.append("name", recipeData.name);
    formData.append("description", recipeData.description);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("preparation", recipeData.preparation);
    formData.append("calories", recipeData.nutritionalValues.calories);
    formData.append("fat", recipeData.nutritionalValues.fat);
    formData.append("proteins", recipeData.nutritionalValues.proteins);

    // Assuming `recipeData.image` is a File object from an <input type="file" />
    if (recipeData.image) {
      formData.append("image", recipeData.image);
    }

    try {
      // Call the updateRecipe method from RecipesApi and pass the recipeData
      const response = await RecipesApi.updateRecipe(recipeId, formData);
      console.log("Recipe successfully updated:", response);
      // alert('Recipe updated successfully');
      showPopup(`Recipe edited successfully`);
    } catch (error) {
      console.error("Failed to update the recipe:", error);
      alert("Failed to update the recipe");
    }
  };

  const { theme } = useTheme();
  const { darkMode } = theme;

  const submitBtnStyle = darkMode === "dark" ? "bg-slate-600" : "bg-green-500";

  return (
    <div className="container mx-auto AssistantFont">
      <PopupMessage
        isVisible={isPopupVisible}
        message={message}
        onClose={showPopup}
        duration={3000}
      />
      {recipeData ? (
        <>
          <form className="max-w-md mx-auto pb-4" onSubmit={handleSubmit}>
            <div className="mb-4 mx-4">
              <label
                htmlFor="name"
                className="block text-lg font-semibold text-gray-700 mb-1"
              >
                RECIPE NAME
              </label>
              <textarea
                id="name"
                className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
                placeholder="Enter Recipe Name"
                value={recipeData.name}
                onChange={handleInputChange}
                style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
              />
            </div>
            <div className="mb-4 mx-4">
              <label
                htmlFor="description"
                className="block text-lg font-semibold text-gray-700"
              >
                DESCRIPTION
              </label>
              <textarea
                id="description"
                className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
                placeholder="Enter Recipe Description"
                value={recipeData.description}
                onChange={handleInputChange}
                style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
              />
            </div>
            <div className="mb-4 mx-4">
              <label
                htmlFor="ingredients"
                className="block text-lg font-semibold text-gray-700"
              >
                INGREDIENTS
              </label>
              <textarea
                id="ingredients"
                className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
                placeholder="Enter Recipe Ingredients"
                value={recipeData.ingredients}
                onChange={handleInputChange}
                style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
              />
            </div>
            <div className="mb-4 mx-4">
              <label
                htmlFor="preparation"
                className="block text-lg font-semibold text-gray-700"
              >
                PREPARATION
              </label>
              <textarea
                id="preparation"
                className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
                placeholder="Enter Recipe Preparation"
                value={recipeData.preparation}
                onChange={handleInputChange}
                style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
              />
            </div>

            {/* Nutritional Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="mb-2 mx-4">
                <label
                  htmlFor="calories"
                  className="block text-lg font-semibold text-gray-700"
                >
                  CALORIES
                </label>
                <textarea
                  id="nutritionalValues.calories"
                  className=" rounded p-2 text-sm text-left w-full resize-none"
                  placeholder="Enter Calories"
                  value={recipeData.nutritionalValues.calories}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: "0.999rem",
                    backgroundColor: "#f5f5f5",
                  }} // TailwindCSS rounded-md equivalent and light gray background
                />
              </div>

              <div className="mb-2 mx-4">
                <label
                  htmlFor="fat"
                  className="block text-lg font-semibold text-gray-700"
                >
                  FAT
                </label>
                <textarea
                  id="nutritionalValues.fat"
                  className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
                  placeholder="Enter Fat (g)"
                  value={recipeData.nutritionalValues.fat}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: "0.999rem",
                    backgroundColor: "#f5f5f5",
                  }} // TailwindCSS rounded-md equivalent and light gray background
                />
              </div>

              <div className="mb-2 mx-4">
                <label
                  htmlFor="proteins"
                  className="block text-lg font-semibold text-gray-700"
                >
                  PROTEINS
                </label>
                <textarea
                  id="nutritionalValues.proteins"
                  className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
                  placeholder="Enter Proteins (g)"
                  value={recipeData.nutritionalValues.proteins}
                  onChange={handleInputChange}
                  style={{
                    borderRadius: "0.999rem",
                    backgroundColor: "#f5f5f5",
                  }} // TailwindCSS rounded-md equivalent and light gray background
                />
              </div>
            </div>

            {/* Image input */}
            <div className="mb-6 mx-4">
              <input
                type="file"
                id="recipeImage"
                name="recipeImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {/* <p className="text-gray-700 px-4 font-semibold">{recipeData.image && `Image uploaded: ${recipeData.image}`}</p> */}
              {/* Image preview */}
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Recipe Preview"
                  className="w-full h-64 object-cover rounded-md" // Adjust dimensions as needed
                />
              )}
              <button
                type="button"
                onClick={() => document.getElementById("recipeImage").click()}
                className="cursor-pointer text-lg bg-gray-300 text-gray-700 px-4 py-2 mt-4 rounded-md font-bold hover:bg-gray-400"
              >
                Choose File
              </button>
              {/* <p className="text-gray-700 px-4 font-semibold">
                                    {recipeData.image && (
                                    <>
                                       <img src={recipeData.image} alt="Recipe Image" />
                                    </>
                                    )}
                                </p> */}
            </div>

            {/* Submit button */}
            <div className="px-2">
              <button
                type="submit"
                className={`text-lg font-bold py-3 ${submitBtnStyle} rounded-lg shadow-md w-full text-white hover:bg-emerald-500`}
              >
                UPDATE RECIPE
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditRecipeForm;
