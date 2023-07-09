import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/";



const token = localStorage.getItem("jwt");

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


const updateUser = async (userData) => {
  //const user = localStorage.getItem("user");
  
  console.log("Test6666");
  const userInLocalStorage = JSON.parse(localStorage.getItem('user'));
  //console.log(userInLocalStorage.user._id);
  //console.log("Test2222");
  console.log(userData);
  try {
    const response = await axiosApiInstance.patch(API_URL + "users/" + userInLocalStorage.user._id, userData);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const UpdateUserProfileService = {
  updateUser,
};

export default UpdateUserProfileService;
