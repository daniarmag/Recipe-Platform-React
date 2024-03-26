import React, { useState } from "react";
import RecipesApi from "../api/RecipesApi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import usePopupMessage from "../hooks/usePopupMessage.js";
import PopupMessage from "./PopupMessage.js";

const CreateNewRecipe = () => {
  const { user } = useAuth();
  const [recipeData, setRecipeData] = useState({
    author: user?.email || "",
    name: "",
    description: "",
    ingredients: "",
    preparation: "",
    nutritionalValues: {
      calories: "",
      fat: "",
      proteins: "",
    },
    image: null,
  });

  const { isVisible: isPopupVisible, message, showPopup } = usePopupMessage(); // Use the custom hook for popup message

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
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
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
    console.log(recipeData);
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
      // Call the createRecipe method from RecipesApi and pass the recipeData
      const response = await RecipesApi.createRecipe(formData);
      console.log("Recipe successfully added:", response);
      showPopup(`Recipe added successfully`);
      // alert('Recipe added successfully');

      setRecipeData({
        author: user?.email || "",
        name: "",
        description: "",
        ingredients: "",
        preparation: "",
        nutritionalValues: {
          calories: "",
          fat: "",
          proteins: "",
        },
        image: null,
      });
      setImagePreviewUrl(null); // This line clears the image preview
      // Optionally, clear the form or navigate the user to a different page
    } catch (error) {
      console.error("Failed to add the recipe:", error);
      alert("Failed to add the recipe");
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
      <div className="text-3xl  text-gray-800 font-bold text-center pt-3 bigTitle sm:text-3xl mb-3 ">
        ADD YOUR RECIPE HERE
      </div>
      <form className="max-w-md mx-auto pb-4" onSubmit={handleSubmit}>
        <div className="mb-4 mx-2">
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

        <div className="mb-4  mx-2">
          {" "}
          {/* Added mx-4 for spacing */}
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700"
          >
            DESCRIPTION
          </label>
          <textarea
            id="description"
            className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
            placeholder="Enter Description"
            value={recipeData.description}
            onChange={handleInputChange}
            style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
          />
        </div>

        <div className="mb-4 mx-2">
          {" "}
          {/* Added mx-4 for spacing */}
          <label
            htmlFor="ingredients"
            className="block text-lg font-semibold text-gray-700"
          >
            INGREDIENTS
          </label>
          <textarea
            id="ingredients"
            className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
            placeholder="Enter Ingredients. Each ingredient on a separate line."
            value={recipeData.ingredients}
            onChange={handleInputChange}
            style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
          />
        </div>

        <div className="mb-4 mx-2">
          {" "}
          {/* Added mx-4 for spacing */}
          <label
            htmlFor="preparation"
            className="block text-lg font-semibold text-gray-700"
          >
            PREPARATION
          </label>
          <textarea
            id="preparation"
            className="p-2 text-sm text-left w-full placeholder-gray-400 resize-none"
            placeholder="Enter Preparation. Each step on a separate line."
            value={recipeData.preparation}
            onChange={handleInputChange}
            style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="mb-2 mx-2">
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
              style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
            />
          </div>

          <div className="mb-2 mx-2">
            {" "}
            {/* Added mx-4 for spacing */}
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
              style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
            />
          </div>

          <div className="mb-2 mx-2">
            {" "}
            {/* Added mx-4 for spacing */}
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
              style={{ borderRadius: "0.999rem", backgroundColor: "#f5f5f5" }} // TailwindCSS rounded-md equivalent and light gray background
            />
          </div>
        </div>

        {/* Image input */}
        <div className="mb-6 mx-2">
          <input
            type="file"
            id="recipeImage"
            name="recipeImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          {/* Image preview */}
          {imagePreviewUrl && (
            <img
              src={imagePreviewUrl}
              alt="Preview"
              className="w-full h-64 object-cover rounded-md" // Adjust w-24 h-24 to control the size of the preview
            />
          )}
          <button
            type="button"
            onClick={() => document.getElementById("recipeImage").click()}
            className="cursor-pointer text-lg bg-gray-300 text-gray-700 px-4 py-2 mt-4 rounded-md font-bold hover:bg-gray-400"
          >
            Choose File
          </button>
        </div>

        {/* Submit button */}
        <div className="px-2">
          <button
            type="submit"
            // style={submitBtnStyle}
            className={`text-lg font-bold py-3 ${submitBtnStyle} rounded-lg shadow-md w-full text-white hover:bg-emerald-500`}
          >
            SUBMIT RECIPE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNewRecipe;
