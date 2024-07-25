// import axios from 'axios';
// import config from '../config.js'; 
// const {apiBaseUrl } = config;

// /**
//  * A class to handle API requests related to users.
//  */
// class UsersApi {
//   constructor() {
//     this.api = axios.create({
//       baseURL: apiBaseUrl,
//     });
//   }

//   /**
//    * Registers a new user.
//    */
//   async registerUser(formData) {
//     try {
//       const response = await this.api.post('/users/register', formData);
//       return response.data;
//     } catch (error) {
//       console.error('Error registering user:', error);
//       throw error;
//     }
//   }

//    /**
//    * Logs in a user.
//    */
//   async loginUser(formData) {
//     try {
//       const response = await this.api.post('/users/login', formData);
//       return response.data;
//     } catch (error) {
//       console.error('Error logging in user:', error);
//       throw error;
//     }
//   }

//    /**
//    * Logs out the current user.
//    */
//   async logoutUser() {
//     try {
//       const response = await this.api.post('/users/logout');
//       return response.data;
//     } catch (error) {
//       console.error('Error logging out user:', error);
//       throw error;
//     }
//   }

//   /**
//    * Retrieves the current user.
//    */
//   async getCurrentUser() {
//     try {
//       const response = await this.api.get('/users/current-user');
//       return response.data;
//     } catch (error) {
//       console.log('There is no user currently logged in.');
//       return null;
//     }
//   }


// }

// export default new UsersApi();
import axios from 'axios';
import config from '../config.js'; 
const { apiBaseUrl } = config;

/**
 * A class to handle API requests related to users.
 */
class UsersApi {
  constructor() {
    this.api = axios.create({
      baseURL: apiBaseUrl,
    });

    // Add a request interceptor to include the token in every request
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }

  /**
   * Registers a new user.
   */
  async registerUser(formData) {
    try {
      const response = await this.api.post('/users/register', formData);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

   /**
   * Logs in a user.
   */
  async loginUser(formData) {
    try {
      const response = await this.api.post('/users/login', formData);
      return response.data;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  }

   /**
   * Logs out the current user.
   */
  async logoutUser() {
    try {
      const response = await this.api.post('/users/logout');
      return response.data;
    } catch (error) {
      console.error('Error logging out user:', error);
      throw error;
    }
  }

  /**
   * Retrieves the current user.
   */
  async getCurrentUser() {
    try {
      const response = await this.api.get('/users/current-user');
      return response.data;
    } catch (error) {
      console.log('There is no user currently logged in.');
      return null;
    }
  }
}

export default new UsersApi();
