
import axios from 'axios';
const baseURL = 'http://localhost:5000';

export const updateUserProfile = async (user) => {
  try {
    const response = await axios.put(`${baseURL}/api/users/profile`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserSettings = async (settings) => {
  try {
    const response = await axios.put(`${baseURL}/api/users/settings`, settings);
    return response.data;
  } catch (error) {
    throw error;
  }
};

