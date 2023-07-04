import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./helpers/styles/RatingStyles";
import axios from "axios";
import { useParams } from "react-router-dom";

const Rate = () => {
  const [details, setDetails] = useState({});
  let params = useParams();
  const token = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('user'));
  const API_URL = `http://localhost:8000/api/v1`; // Updated API URL
  const API1_URL = 'http://localhost:8000/api/v1/recipes';
  const [rate, setRate] = useState(0);
  const [userRating, setUserRating] = useState(null);
  const [review, setReview] = useState([]);

  const getInformation = async () => {
    try {
      const response = await axios.get(`${API1_URL}/${params.name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const recipeData = response.data;
      setDetails(recipeData);
    } catch (error) {
      console.error('Failed to retrieve recipes:', error);
      throw error;
    }
  };

  useEffect(() => {
    getInformation();
  }, [params.name]);

  const recipeID = details._id;

  const postReview = async (recipeId, reviewData) => {
    try {
      const response = await axios.post(`${API_URL}/review/create`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
      console.log(reviewData);
      console.error('Failed to create review:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (rate !== 0) {
      const revData = createReviewData(rate);
      postReview(recipeID, revData);
    }
  }, [rate, recipeID]);



  const checkUserReview = () => {
    const userReviews = user.reviews;
    console.log("a");
    if (userReviews != null) {
      console.log("s");
      for (let i = 0; i < userReviews.length; i++) {
        const review = userReviews[i];
        if (review._id === recipeID) {
          setRate(review.rate);
          return review.rate;
        }
      }
    }

    // User has not reviewed the current recipe
    return null;
  };

  const createReviewData = (rating) => {
    return {
      recipeId: recipeID,
      text: "",
      rating: rating
      // Add any other properties you need for the review data
    };
  };


  const handleRatingChange = (givenRating) => {
    const userReviewRating = checkUserReview(token, recipeID);

    if (userReviewRating === null) {
      setRate(givenRating);
      alert(`Are you sure you want to give ${givenRating} stars?`);
      setUserRating(givenRating); // Update the userRating state
    }
  };
  
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={givenRating}>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => handleRatingChange(givenRating)}
              disabled={userRating !== null} // Disable the radio button if user has rated
            />
            <Rating>
              <FaStar
                size={35} // Adjust the size value as per your requirement
                color={givenRating <= (userRating || rate) ? "000" : "rgb(192,192,192)"}
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default Rate;
