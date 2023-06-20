import axios from 'axios';
const baseURL = 'http://localhost:3000';

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${baseURL}/api/auth/register`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await axios.post(`${baseURL}/api/auth/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await axios.put(`${baseURL}/api/user/profile`, userData);
  return response.data;
};

const authService = {
  register,
  login,
  updateUserProfile,
};

export default authService;

