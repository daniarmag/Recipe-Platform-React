import axios from 'axios';
import config from '../config.js'; 
const {apiBaseUrl } = config;

/**
 * Converts a file to base64 format.
 */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * A class to handle API requests related to recipes.
 */
class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: apiBaseUrl,
    });
  }
  
  /**
   * Creates a new recipe.
   */
  async createRecipe(formData) {
    let data={};    
    
    // Process each form data entry asynchronously
    const entries = Array.from(formData.entries());
    const asyncTasks = entries.map(async ([key, value]) => {
      
      if (key === 'image') {
        if (value instanceof File) {
          // Convert image file to base64
          data[key] = await fileToBase64(value); 
        } else {
          // Regular form values
          data[key] = value; 
        }
      } else {
        data[key] = value; 
      }
    });

    // Wait for all async tasks to complete
    await Promise.all(asyncTasks);  
    console.log(data);
    try {
      // Send a POST request to create the recipe
      const response = await this.api.post('/recipes', data);
      // Return the created recipe data
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  /**
   * Retrieves a list of recipes.
   */
  async getRecipes({page, pageSize, searchQuery, filterOwnedRecipes}) {
    try {
      const response = await this.api.get('/recipes', {
        params: { page, pageSize, searchQuery, filterOwnedRecipes },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting recipes:', error);
      throw error;
    }
  }
  
  /**
   * Retrieves a recipe by its ID.
   */
  async getRecipeById(id) {
    try {
      const response = await this.api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting recipe with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Updates a recipe.
   */
  async updateRecipe(id, formData) {
    let data={};   
    try {
      // The updated data
      const entries = Array.from(formData.entries());
      const asyncTasks = entries.map(async ([key, value]) => {
        if (key === 'image') {
          if (value instanceof File) {
            // Convert image file to base64
            data[key] = await fileToBase64(value); 
          } else {
            // Regular form values
            data[key] =value; 
          }
        } else {
          data[key] = value; 
        }
      });

      await Promise.all(asyncTasks);
      const response = await this.api.put(`/recipes/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating recipe with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Deletes a recipe by its ID.
   */
  async deleteRecipe(id) {
    try {
      const response = await this.api.delete(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting recipe with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new RecipesApi();
