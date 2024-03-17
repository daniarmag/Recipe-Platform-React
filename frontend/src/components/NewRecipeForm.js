import React, { useState } from 'react';
import RecipesApi from '../api/RecipesApi';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import usePopupMessage from "../hooks/usePopupMessage.js";
import PopupMessage from "./PopupMessage.js";

const CreateNewRecipe = () => {
    const { user } = useAuth();
    const [recipeData, setRecipeData] = useState({
      author: user?.email || '',
      name: '',
      description: '',
      ingredients: '',
      preparation: '',
      nutritionalValues: {
        calories: '',
        fat: '',
        proteins: ''
      },
      image: null,
    });
  

    const { isVisible: isPopupVisible, message, showPopup } = usePopupMessage(); // Use the custom hook for popup message


    const handleInputChange = (e) => {
      const { id, value } = e.target;
      if (id.includes('nutritionalValues.')) {
        const key = id.split('.')[1];
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
      console.log(file)
      if (file) {
        setRecipeData({ ...recipeData, image: file });
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      console.log(recipeData)
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
        console.log('Recipe successfully added:', response);
        showPopup(`Recipe added successfully`);
        // alert('Recipe added successfully');

        setRecipeData({
          author: user?.email || '',
          name: '',
          description: '',
          ingredients: '',
          preparation: '',
          nutritionalValues: {
            calories: '',
            fat: '',
            proteins: ''
          },
          image: null,
        });

        // Optionally, clear the form or navigate the user to a different page
      } catch (error) {
        console.error('Failed to add the recipe:', error);
        alert('Failed to add the recipe');
      }
    };


    const { theme } = useTheme();
    const { darkMode } = theme;

    const submitBtnStyle = darkMode === 'dark' ? 'bg-slate-600' : 'bg-green-500'


  return (
    <div className="container mx-auto" >
        <PopupMessage isVisible={isPopupVisible} message={message} onClose={showPopup} duration={3000} />
        <div className="text-3xl text-gray-600 font-bold text-center py-3 bigTitle sm:text-3xl">
          Add your Recipe here.
        </div>
        <form className="max-w-md mx-auto pb-4" onSubmit={handleSubmit}>
  
        <div className="mb-4 mx-4"> {/* Added mx-4 for spacing */}
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Recipe Name:
          </label>
          <textarea
            id="name"
            className="border rounded p-2 text-sm text-left w-full"
            placeholder="Enter Recipe Name"
            value={recipeData.name}
            onChange={handleInputChange}
          />
        </div>
        

      <div className="mb-4 mx-4"> {/* Added mx-4 for spacing */}
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          className="border rounded p-2 text-sm text-left w-full"
          placeholder="Enter Description"
          value={recipeData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4 mx-4"> {/* Added mx-4 for spacing */}
        <label htmlFor="ingredients" className="block text-sm font-semibold text-gray-700">
          Ingredients
        </label>
        <textarea
          id="ingredients"
          className="border rounded p-2 text-sm text-left w-full"
          placeholder="Enter Ingredients. Each ingredient on a separate line."
          value={recipeData.ingredients}
          onChange={handleInputChange}
        />
      </div>

      <div className="mb-4 mx-4"> {/* Added mx-4 for spacing */}
        <label htmlFor="preparation" className="block text-sm font-semibold text-gray-700">
          Preparation
        </label>
        <textarea
          id="preparation"
          className="border rounded p-2 text-sm text-left w-full"
          placeholder="Enter Preparation. Each step on a separate line."
          value={recipeData.preparation}
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
          <label htmlFor="calories" className="block text-sm font-semibold text-gray-700">
            Calories
          </label>
          <textarea
            id="nutritionalValues.calories"
            className="border rounded p-2 text-sm text-left w-full"
            placeholder="Enter Calories"
            value={recipeData.nutritionalValues.calories}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
          <label htmlFor="fat" className="block text-sm font-semibold text-gray-700">
            Fat
          </label>
          <textarea
            id="nutritionalValues.fat"
            className="border rounded p-2 text-sm text-left w-full"
            placeholder="Enter Fat (g)"
            value={recipeData.nutritionalValues.fat}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
          <label htmlFor="proteins" className="block text-sm font-semibold text-gray-700">
            Proteins
          </label>
          <textarea
            id="nutritionalValues.proteins"
            className="border rounded p-2 text-sm text-left w-full"
            placeholder="Enter Proteins (g)"
            value={recipeData.nutritionalValues.proteins}
            onChange={handleInputChange}
          />
        </div>
      </div>

              {/* Image input */}
              <div className="mb-4 mx-4 ">
                <label htmlFor="recipeImage" className="block text-sm font-semibold text-gray-700">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="recipeImage"
                  name="recipeImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <p className="text-gray-700 px-4 font-semibold">{recipeData.image && `Image uploaded: ${recipeData.image}`}</p>
                <button
                  type="button"
                  onClick={() => document.getElementById('recipeImage').click()}
                  className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                >
                  Choose File
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                // style={submitBtnStyle}
                className={`text-lg font-bold p-3 ${submitBtnStyle} rounded-md shadow-md  mx-auto block w-full`}
              >
                Submit Recipe
              </button>
            </form>
    </div>
  );
};

export default CreateNewRecipe;
