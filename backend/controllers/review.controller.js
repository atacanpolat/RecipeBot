import Recipe from "../mongodb/models/recipe.js";
import User from "../mongodb/models/user.js";
import Review from "../mongodb/models/review.js";
import asyncHandler from "express-async-handler";

export const createReview = asyncHandler(async (req,res) => {
    try {
        const user = req.user;
        const { id, text, rating } = req.body;
        const recipe = await Recipe.recipeModel.findById(id);

       if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
          }

        if (recipe.createdBy.toString() === user.id.toString()) {
            return res
              .status(400)
              .json({ error: "Sneaky :)) You are not allowed to leave a review to your own recipe :))" });
          }
          
        const existingReview = await Review.reviewModel.findOne({
            createdFor: recipe._id,
            createdBy: user._id,
        });
      
        if (existingReview) {
          return res
            .status(400)
            .json({ error: "You have already written a review for this recipe" });
        } 
        const review = new Review.reviewModel({
            text,
            rating,
            createdFor: recipe._id,
            createdBy: user._id,
          });
          await review.save();
      
          user.reviewsWritten.push(recipe._id);
          await user.save();
          recipe.reviews.push(review);
          await recipe.save();

      
          res.status(201).json(review);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
  })

  export const updateReview = asyncHandler(async (req, res) => {
    try {
      const user = req.user;
      const { id, text, rating } = req.body;
      
      const review = await Review.reviewModel.findById(id);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      if (review.createdBy.toString() !== user.id) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
      
      review.text = text;
      review.rating = rating;
      
      await review.save();
      
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  export const deleteReview = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;
      
      const review = await Review.reviewModel.findById(id);
      if (!review) {
        return res.status(404).json({ error: "Review not found" });
      }

      if (review.createdBy.toString() !== user.id) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
      
      await review.remove();
      
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });



  export default {createReview, updateReview, deleteReview};