import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

const reviewService = {
  getReviewUser: async (userId, token) => {
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get review user:", error);
      throw error;
    }
  },
  createReview: async (reviewData, token) => {
    try {
      const response = await axios.post(`${API_URL}/review/create`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch the user data for the current user
      const currentUser = JSON.parse(localStorage.getItem('user'));

      // Include the user data in the created review
      const createdReview = {
        ...response.data,
        user: currentUser,
      };

      return createdReview;
    } catch (error) {
      console.error("Failed to create review:", error);
      throw error;
    }
  },
  updateReview: async (reviewId, reviewData, token) => {
    try {
      const response = await axios.patch(`${API_URL}/review/${reviewId}`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to update review:", error);
      throw error;
    }
  },
  deleteReview: async (reviewId, token) => {
    try {
      const response = await axios.delete(API_URL+'/review/'+reviewId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to delete review:", error);
      throw error;
    }
  },
  getReviewsByRecipe: async (recipe, token) => {
    try {
        if (recipe.reviews) {
        const reviewPromises = recipe.reviews.map((review) => {
          return axios.get(`${API_URL}/users/${review.createdBy}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        });

        const userResponses = await Promise.all(reviewPromises);
        const updatedReviews = recipe.reviews.map((review, index) => ({
          ...review,
          user: userResponses[index].data,
        }));
        return updatedReviews;
    } else {
        return [];
    }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }

  }
};

export default reviewService;
