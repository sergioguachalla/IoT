import axios from 'axios';

// TODO: Make a env
const API_URL = 'http://localhost:8000';

const authService = {
   login: async (credentials) => {
      try {
         const response = await axios.post(`${API_URL}/users/auth`, credentials);
         
      } catch (error) {
         return error
         
      }
   },

   register: async (userData) => {
      try {
         const response = await axios.post(`${API_URL}/register`, userData);
         return response.data;
      } catch (error) {
         console.error('Error registering:', error);
         return error
      }
   },

   getUser: async (token) => {
      try {
         const response = await axios.get(`${API_URL}/user`, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         return response.data;
      } catch (error) {
         console.error('Error fetching user:', error);
         throw error;
      }
   }
};

export default authService;