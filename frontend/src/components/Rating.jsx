import React, { useState, useEffect } from "react";
import { Container } from "./helpers/styles/RatingStyles";
import axios from "axios";
import { useParams } from "react-router-dom";
import RatingStars from "./RatingStars";

const Rate = () => {
  const [details, setDetails] = useState({});
  const { name } = useParams();
  const token = localStorage.getItem("jwt");
  const user = JSON.parse(localStorage.getItem("user"));
  const API_URL = `http://localhost:8000/api/v1/recipes/`;

  const [userRating, setUserRating] = useState(null);

  const [recipeInDatabase, setRecipeInDatabase] = useState(false);

  const getInformation = async () => {
    try {
      const response = await axios.get(API_URL + name, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const recipeData = response.data;
      setRecipeInDatabase(true);
      setDetails(recipeData);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        const recipeData = JSON.parse(localStorage.getItem("recipe"));
        setRecipeInDatabase(false);
        setDetails(recipeData);
      } else {
        console.error("Failed to retrieve recipe:", error);
      }
    }
  };

  useEffect(() => {
    getInformation();
  }, [name]);

  const handleRatingChange = (givenRating) => {
    if (userRating === null) {
      // User has not rated the current recipe
      setUserRating(givenRating);
      alert(`Are you sure you want to give ${givenRating} stars?`);
      // You can perform additional actions with the rating, such as submitting it to the server
    }
  };

  return (
    <Container>
      <RatingStars onChange={handleRatingChange} />
    </Container>
  );
};

export default Rate;
