import express from "express";

<<<<<<< Updated upstream
import { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, generateRecipe, saveRecipe, modifyRecipe } from "../controllers/recipe.controller.js";
=======
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  generateRecipe,
  saveRecipe,
  modifyRecipe,
  filterRecipes,
  getSavedRecipes,
  getCreatedRecipes,
} from "../controllers/recipe.controller.js";
>>>>>>> Stashed changes
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/helperFunctionsMiddleware.js";

const router = express.Router();

<<<<<<< Updated upstream
router.get('/', protect, getAllRecipes);
router.get('/:id', protect, getRecipeById);

router.post('/create', protect, createRecipe);
router.patch('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

router.post('/generate', protect, generateRecipe);
router.put('/:id', protect, saveRecipe)
router.post('/:id/generate', protect, modifyRecipe);
=======
router.get("/", protect, getAllRecipes);
router.get("/created", protect, getCreatedRecipes);
router.get("/saved", protect, getSavedRecipes);
router.get("/:id", protect, getRecipeById);
router.patch("/filter", protect, filterRecipes);
router.post("/create", protect, createRecipe);
router.patch("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);

router.post("/generate", protect, generateRecipe);
router.patch("/:id/save", protect, saveRecipe);
router.post("/:id/generate", protect, modifyRecipe);
>>>>>>> Stashed changes

export default router;
