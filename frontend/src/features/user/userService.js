import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1/users/'

const token = localStorage.getItem('jwt');

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
    async config => {
      config.headers = { 
        'Authorization': `Bearer ${token}`
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });

const getUserbyId = async(userId) => {
    try {
        const response = await axiosApiInstance.get(API_URL + userId, userId, {});
        return response.data;        
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    getUserbyId
}
export default userService;