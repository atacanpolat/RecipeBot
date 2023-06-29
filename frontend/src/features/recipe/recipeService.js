import axios from "axios";

const API_URL_RECIPE = "http://localhost:8000/api/v1/recipes/";

//Register user
const getAllRecipes = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(API_URL_RECIPE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getCreatedRecipes = async () => {
  try {
    const token = localStorage.getItem("jwt");
    const response = await axios.get(API_URL_RECIPE + "/created", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getSavedRecipes = async () => {
  try {
    const token = localStorage.getItem("jwt");

    const response = await axios.get(API_URL_RECIPE + "/saved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getFilteredRecipes = async (filters) => {
  try {
    const token = localStorage.getItem('jwt');
    
    
    const response = await axios.patch(API_URL_RECIPE + '/filter', filters, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch filtered recipes');
  }
};

const calculateRecipeData = (responseData) => {
  const calculatedData = [];

  for (const recipeData of responseData) {
    const { _id, title, photo, tags, reviews, createdBy } = recipeData;
    const recipeId = _id;
    const imgSrc = photo;
    const tagList = tags.join(", ");
    const reviewCount = reviews.length;
    const recipeUrl = "http://localhost:3000/recipes/:" + _id;

    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });
    const meanRating = reviewCount > 0 ? totalRating / reviewCount : 0;
    console.log(createdBy);

    calculatedData.push({
      recipeId,
      title,
      imgSrc,
      tags: tagList,
      reviewCount,
      meanRating,
      recipeUrl,
      createdBy
    });
  }

  return calculatedData;
};

const recipeService = {
  getAllRecipes,
  getCreatedRecipes,
  getSavedRecipes,
  getFilteredRecipes,
  calculateRecipeData,
};

export default recipeService;
