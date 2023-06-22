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
  

const authService = {
    register,
    login
}

export default authService;