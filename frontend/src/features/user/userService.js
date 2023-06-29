import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1/users/'

const getUserbyId = async(userId) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(API_URL + userId, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        console.log(response.data);
        return response.data;        
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    getUserbyId
}
export default userService;