import express from "express";

import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  generateRecipe,
  saveRecipe,
  removeRecipe,
  modifyRecipe,
  filterRecipes,
  getSavedRecipes,
  getCreatedRecipes,
  uploadRecipeImage,
} from "../controllers/recipe.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/helperFunctionsMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllRecipes);
router.get("/created", protect, getCreatedRecipes);
router.get("/saved", protect, getSavedRecipes);
router.get("/:id", getRecipeById);
router.patch("/filter", protect, filterRecipes);
router.post("/create", protect, createRecipe);
router.post("/upload", protect, upload.single("file"), uploadRecipeImage);
router.patch("/:id", protect, updateRecipe);
router.delete("/delete", protect, deleteRecipe);

router.post("/generate", generateRecipe);
router.post("/save", protect, saveRecipe);
router.put("/remove", protect, removeRecipe);
router.post("/:id/generate", protect, modifyRecipe);

export default router;
