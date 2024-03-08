import axios from 'axios';

const apiBaseUrl = 'http://localhost:5000/api';

class RecipesApi {
  constructor() {
    this.api = axios.create({
      baseURL: apiBaseUrl,
    });
  }

  async createRecipe(data) {
    try {
      const response = await this.api.post('/recipes', data);
      return response.data;
    } catch (error) {
      console.error('Error creating recipe:', error);
      throw error;
    }
  }

  async getRecipes(searchQuery) {
    try {
      const response = await this.api.get('/recipes', {
        params: { searchQuery } 
      });
      return response.data;
    } catch (error) {
      console.error('Error getting recipes:', error);
      throw error;
    }
  }
  
  async getRecipe(id) {
    try {
      const response = await this.api.get(`/recipes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting recipe with ID ${id}:`, error);
      throw error;
    }
  }

  async updateRecipe(id, data) {
    try {
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
