import express from "express";

import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, generateRecipe, saveRecipe, modifyRecipe, getUserRecipes } from "../controllers/recipe.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/helperFunctionsMiddleware.js";

const router = express.Router();

router.get('/', protect, getAllRecipes);
router.get('/saved', protect, getUserRecipes);
router.get('/:id', protect, getRecipeById);

router.post('/create', protect, createRecipe);
router.patch('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

router.post('/generate', protect, generateRecipe);
router.put('/:id', protect, saveRecipe)
router.post('/:id/generate', protect, modifyRecipe);

export default router;