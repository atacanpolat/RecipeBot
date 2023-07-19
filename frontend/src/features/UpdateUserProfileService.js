import axios from "axios";
import userService2 from "./user/userService";

const API_URL = "http://localhost:8000/api/v1/";


//pushtry
const token = localStorage.getItem("jwt");

const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const updateUser = async (userData) => {
  const userInLocalStorage = JSON.parse(localStorage.getItem("user"));
  console.log(userData);
  try {
    const response = await axiosApiInstance.patch(
      API_URL + "users/" + userInLocalStorage._id,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const UpdateUserProfileService = {
  updateUser,
};

export default UpdateUserProfileService;
