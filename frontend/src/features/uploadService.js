import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/'


const uploadUserPhoto = async (formData) => {
    var uploadSuccess = false;
    const token = localStorage.getItem('jwt');
    try {      
      const response = await axios.post(API_URL + 'users/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      uploadSuccess = true;
      return response.data;
      
    } catch (error) {
      // Handle the error
      console.error(error);
      throw new Error(error);
    }
  }

const uploadService = {
    uploadUserPhoto
}

export default uploadService;