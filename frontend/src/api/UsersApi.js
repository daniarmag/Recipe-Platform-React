import axios from 'axios';
import config from '../config.js'; 
const {apiBaseUrl } = config;

class UsersApi {
  constructor() {
    this.api = axios.create({
      baseURL: apiBaseUrl,
    });
  }

  async registerUser(formData) {
    try {
      const response = await this.api.post('/users/register', formData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  async loginUser(formData) {
    try {
      const response = await this.api.post('/users/login', formData);
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      const response = await this.api.post('/users/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out user:', error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.api.get('/users/current-user');
      return response.data;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }


}

export default new UsersApi();
