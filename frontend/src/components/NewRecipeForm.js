import React, { useState } from 'react';

const CreateNewRecipe = () => {
    const [recipeData, setRecipeData] = useState({
      nameUser: '',
      nameRecipe: '',
      description: '',
      ingredients: '',
      preparation: '',
      calories: '',
      fat: '',
      protein: '',
      imageUrl: '',
    });
  
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setRecipeData({ ...recipeData, [id]: value });
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setRecipeData({ ...recipeData, imageUrl });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your submission logic here or call the submitRecipe function
      console.log('Form submitted:', recipeData);
    };
  
  return (
    <div className="container mx-auto">
        <div className="text-3xl text-gray-600 font-bold text-center py-3 bigTitle sm:text-3xl">
          Add your Recipe here.
        </div>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
            <textarea
              id="nameUser"
              className="border rounded text-sm text-left w-full"
              placeholder="Enter your name"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
            <textarea
              id="nameRecipe"
              className="border rounded text-sm text-left w-full"
              placeholder="Enter Recipe Name"
              onChange={handleInputChange}
            />
          </div>
        </div>

      <div className="mb-4 mx-4"> {/* Added mx-4 for spacing */}
        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          className="border rounded p-2 text-sm text-left w-full"
          placeholder="Enter Description"
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
          onChange={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
          <label htmlFor="calories" className="block text-sm font-semibold text-gray-700">
            Calories
          </label>
          <textarea
            id="calories"
            className="border rounded p-2 text-sm text-left w-full"
            placeholder="Enter Calories"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
          <label htmlFor="fat" className="block text-sm font-semibold text-gray-700">
            Fat
          </label>
          <textarea
            id="fat"
            className="border rounded p-2 text-sm text-left w-full"
            placeholder="Enter Fat (g)"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-2 mx-4"> {/* Added mx-4 for spacing */}
          <label htmlFor="protein" className="block text-sm font-semibold text-gray-700">
            Protein
          </label>
          <textarea
            id="protein"
            className="border rounded p-2 text-sm text-left w-full"
            placeholder="Enter Protein (g)"
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
                <p className="text-gray-700 px-4 font-semibold">{recipeData.imageUrl && `Image uploaded: ${recipeData.imageUrl}`}</p>
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
                className="text-lg font-bold p-3 bg-green-500 text-white rounded-md shadow-md mb-4 mx-auto block w-full"
              >
                Submit Recipe
              </button>
            </form>
    </div>
  );
};

export default CreateNewRecipe;
