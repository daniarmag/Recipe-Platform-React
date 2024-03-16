import axios from 'axios';
import config from '../config.js'; 
const {apiBaseUrl } = config;

async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: apiBaseUrl,
    });
  }
  

  async createRecipe(formData) {
    let data={};    
    
    const entries = Array.from(formData.entries());
    const asyncTasks = entries.map(async ([key, value]) => {
      
      if (key === 'image') {
        if (value instanceof File) {
          data[key] = await fileToBase64(value); // Convert image file to base64
        } else {
          data[key] = value; // Regular form values
        }
      } else {
        data[key] = value; // Regular form values
      }
    });

    await Promise.all(asyncTasks);  
    console.log(data);
    try {
      const response = await this.api.post('/recipes', data);
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  async getRecipes({page, pageSize, searchQuery}) {
    try {
      const response = await this.api.get('/recipes', {
        params: { page, pageSize, searchQuery },
      });
    //   const url = `/recipes?page=${page}&pageSize=${pageSize}&searchQuery=${searchQuery}`;
    // const response = await this.api.get(url);

      return response.data;
    } catch (error) {
      console.error('Error getting recipes:', error);
      throw error;
    }
  }
  
  async getRecipeById(id) {
    try {
      const response = await this.api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting recipe with ID ${id}:`, error);
      throw error;
    }
  }

  async updateRecipe(id, formData) {
    let data={};   
    try {
      const entries = Array.from(formData.entries());
      const asyncTasks = entries.map(async ([key, value]) => {
        if (key === 'image') {
          if (value instanceof File) {
            data[key] = await fileToBase64(value); // Convert image file to base64
          } else {
            data[key] =value; // Regular form values
          }
        } else {
          data[key] = value; // Regular form values
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
