import express from "express";

import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, generateRecipe, modifyRecipe } from "../controllers/recipe.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', protect, getAllRecipes);
router.get('/:id', protect, getRecipeById);
router.post('/create', protect, createRecipe);
router.patch('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.post('/generate', protect, generateRecipe)
router.post('/:id/generate', protect, modifyRecipe)
export default router;