import axios from 'axios'

const API_URL_RECIPE = 'http://localhost:8000/api/v1/recipes/'
const API_URL_USER = 'http://localhost:8000/api/v1/users/'

//Register user
const getAllRecipes = async () => {
    const token = localStorage.getItem('jwt');
    const response = await axios.get(API_URL_RECIPE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    return response.data
}

//TODO: getUserCreatedRecipes
const getCreatedRecipes = async() => {
    try {
        const token = localStorage.getItem('jwt');
    
        const response = await axios.get(API_URL_RECIPE + '/saved', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    
        // Handle the response data
        console.log(response.data);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
}

const calculateRecipeData = (responseData) => {
  const calculatedData = [];

  for (const recipeData of responseData) {
    const { _id, title, photo, tags, reviews } = recipeData;
    const recipeId = _id;
    const imgSrc = photo;
    const tagList = tags.join(', ');
    const reviewCount = reviews.length;
    const recipeUrl = 'http://localhost:3000/recipes/:' + _id;

    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    const meanRating = reviewCount > 0 ? totalRating / reviewCount : 0;

    calculatedData.push({
      recipeId,
      title,
      imgSrc,
      tags: tagList,
      reviewCount,
      meanRating,
      recipeUrl
    });
  }

  return calculatedData;
};
  


  

const recipeService = {
    getAllRecipes,
    getCreatedRecipes,
    calculateRecipeData
}

export default recipeService