import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1/users/'

const getUserbyId = async(userId) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(API_URL + ':' + userId, userId, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        return response.data;        
    } catch (error) {
        console.log(error);
    }
}

const userService = {
    getUserbyId
}
export default userService;