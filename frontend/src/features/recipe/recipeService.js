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
    const recipeUrl = "http://localhost:3000/recipes/" + _id;

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

const sortRecipes = (recipes, criterion) => {
  const sortedRecipes = [...recipes]; 

  switch (criterion) {
    case "":
      return recipes;
    case "title":
      sortedRecipes.sort((a, b) => {
        const titleA = a.title;
        const titleB = b.title;
        return titleA.localeCompare(titleB);
      });
      break;
    case "popularity":
      sortedRecipes.sort((a, b) => {
        const popularityA = (a.meanRating + a.reviewCount) / 2;
        const popularityB = (b.meanRating + b.reviewCount) / 2;
        return popularityB - popularityA; 
      });
      break;
    case "highest-ranking":
      sortedRecipes.sort((a, b) => {
        return b.meanRating - a.meanRating; 
      });
      break;
    case "most-commented":
      sortedRecipes.sort((a, b) => {
        return b.reviewCount - a.reviewCount; 
      });
      break;
    default:
      return recipes;
  }

  return sortedRecipes;
};

const getRecipeById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL_RECIPE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve recipe:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
const getInstructionById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL_RECIPE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve recipe:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
// Fetch user information based on ID
const fetchUser = async (userId, token) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Failed to retrieve user:', error);
  }
};
const createReview = async (recipeId, reviewData, token) => {
  try {
    const response = await axios.post(
      `${API_URL_RECIPE}/${recipeId}/reviews/create`,
      reviewData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Failed to create review:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
};


const recipeService = {
  getAllRecipes,
  getCreatedRecipes,
  getSavedRecipes,
  getFilteredRecipes,
  calculateRecipeData,
  sortRecipes, 
  getRecipeById, 
  getInstructionById, 
  fetchUser, 
  createReview
};

export default recipeService;
