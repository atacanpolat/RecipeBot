// ReviewComponent.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import RatingStars from "./RatingStars";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import reviewService from "../features/recipe/reviewService";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Radio = styled.input`
  display: none;

  &:checked ~ span {
    color: #ffc107;
  }
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 16px;
  border: 2px solid black;
  font-weight: 600;
  background-color: #0a0a23;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0a0a23;
    color: #fff;
  }
`;

const ReviewContainer = styled.div`
  margin-top: 2rem;
`;

const ReviewForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ReviewTextarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
`;

const ReviewList = styled.div`
  margin-top: 2rem;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;

const ReviewUsername = styled.span`
  font-weight: bold;
`;

const ReviewText = styled.p`
  margin-bottom: 0.5rem;
`;

const ReviewButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ReviewButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 16px;
  border: 2px solid black;
  font-weight: 600;
  background-color: #0a0a23;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0a0a23;
    color: #fff;
  }
`;

const ReviewComponent = ({ recipe, token }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const recipeID = recipe._id;
  const API_URL = "http://localhost:8000/api/v1";
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [userReview, setUserReview] = useState(null);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const updatedReviews = await reviewService.getReviewsByRecipe(recipe, token);
      setReviews(updatedReviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [recipeID, token, user._id]); // Fetch reviews when there's a change in these dependencies

  useEffect(() => {
    const currentUserReview = reviews.find(review => review.createdBy === user._id);

    if (currentUserReview) {
      setUserReview(currentUserReview);
      setRating(currentUserReview.rating);
      setReviewText(currentUserReview.text);
    }
  }, [reviews, user._id]); // Update userReview, rating, and reviewText when there's a change in reviews or user._id

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewSubmit = async () => {
    try {
      const reviewData = {
        recipeId: recipeID,
        rating: rating,
        text: reviewText,
      };

      if (userReview) {
        // Update existing review
        await reviewService.updateReview(userReview._id, reviewData, token);
      } else {
        // Create new review
        await reviewService.createReview(reviewData, token);
      }

      // Refresh the reviews after submitting or updating the review
      fetchReviews();

      console.log("Review submitted successfully");
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const handleReviewDelete = async () => {
    if (!userReview) {
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete your review?");
    if (confirmed) {
      try {
        await reviewService.deleteReview(userReview._id, token);

        // Remove the deleted review from the reviews array
        const updatedReviews = reviews.filter(review => review._id !== userReview._id);
        setUserReview(null);
        setRating(0);
        setReviewText("");
        setReviews(updatedReviews);

        console.log("Review deleted successfully");
      } catch (error) {
        console.error("Failed to delete review:", error);
      }
    }
  };

  const canLeaveReview = !userReview && recipe.createdBy !== user._id;

  return (
    <ReviewContainer>
      {canLeaveReview && (
        <ReviewForm>
          <h2>Leave a Review</h2>
          <Container>
            <RatingStars rating={rating} handleRatingChange={handleRatingChange} />
          </Container>
          <ReviewTextarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <SubmitButton onClick={handleReviewSubmit}>Submit Review</SubmitButton>
        </ReviewForm>
      )}

      <h2>Reviews</h2>
      <ReviewList>
        {reviews.map((review) => (
          <div key={review._id}>
            <ReviewHeader>
              <ProfileImage src={"http://localhost:8000/"+review.user.avatar} alt="Profile" />
              <ReviewUsername>
                {review.user.firstName} {review.user.lastName}
              </ReviewUsername>
              <RatingStars
                rating={review.rating}
                handleRatingChange={() => {}}
              />
            </ReviewHeader>
            <ReviewText>{review.text}</ReviewText>
            {review.user._id === user._id && (
              <ReviewButtons>
                <ReviewButton onClick={() => alert("Modify Review")}>
                  <RiPencilLine /> Modify Review
                </ReviewButton>
                <ReviewButton onClick={handleReviewDelete}>
                  <RiDeleteBinLine /> Delete Review
                </ReviewButton>
              </ReviewButtons>
            )}
          </div>
        ))}
      </ReviewList>
    </ReviewContainer>
  );
};

export default ReviewComponent;
