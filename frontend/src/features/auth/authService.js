import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1/users/'

//Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
    }
    return response.data
}

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data.user))
    }
  
    return response.data
  }

const forgotPassword = async (email) => {
  try {
    const response = await axios.post(API_URL + 'forgot-password', {email})
    return response.data

  } catch (error) {
    return error
  }
}

const resetPassword = async (token, password) => {

  try{
  const response = await axios.post(API_URL + `reset-password/${token}`, { password });
  console.log(API_URL + `reset-password/${token}`)
  return response.data;
  }
  catch (error) {
    return error;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const response = await axios.put(`${API_URL}profile`, userData);
  return response.data;
};


  

const authService = {
    register,
    login,
    forgotPassword,
    resetPassword,
    updateUserProfile
}

export default authService;