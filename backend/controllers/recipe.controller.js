import Recipe from "../mongodb/models/recipe.js";
import User from "../mongodb/models/user.js";
import Review from "../mongodb/models/review.js";
import asyncHandler from "express-async-handler";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

 // Create a new recipe
 export const createRecipe = asyncHandler(async (req, res) => {
    try {
      const { title, ingredients, instruction, photo } = req.body;
      const user = req.user;
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const recipe = new Recipe.recipeModel({
        title,
        ingredients,
        instruction,
        photo,
        createdBy: user._id,
      });
      await recipe.save();
  
      user.createdRecipes.push(recipe._id);
      await user.save();
  
      res.status(201).json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all recipes
  export const getAllRecipes = asyncHandler(async (req, res) => {
    try {
      const recipes = await Recipe.recipeModel.find().populate("reviews");
      res.status(200).json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get a single recipe by ID
  export const getRecipeById = asyncHandler(async (req, res) => {
    try {
      const recipe = await Recipe.recipeModel
        .findById(req.params.id)
        .populate("reviews");
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a recipe
  export const updateRecipe = asyncHandler(async (req, res) => {
    try {
      const { title, ingredients, instruction, photo } = req.body;
      const user = req.user;
      const userId = user.id; 
  
      const recipe = await Recipe.recipeModel.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      if (recipe.createdBy.toString() !== userId) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
  
      recipe.title = title;
      recipe.ingredients = ingredients;
      recipe.instruction = instruction;
      recipe.photo = photo;
      await recipe.save();
  
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a recipe
  export const deleteRecipe = asyncHandler(async (req, res) => {
    try {
      const user = req.user;
      const userId = user.id; // Assuming user ID is stored in req.user.id after authentication
  
      const recipe = await Recipe.recipeModel.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }
  
      if (recipe.createdBy.toString() !== userId) {
        return res.status(401).json({ error: "Unauthorized access" });
      }
  
      await recipe.remove();
  
    
      user.createdRecipes.pull(recipe._id);
      await user.save();
  
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  });
  const openai = new OpenAIApi(configuration);

  export const generateRecipe = asyncHandler(async (req,res) => {
    const user = req.user;
    const {ingredients, utensils, time, diet} = req.body;
    const prompt = `
    Generate me a recipe

    Ingredients: ${ingredients.toString()},
    Cooking Utensils: ${utensils.toString()},
    Cooking Time: ${time.toString()},
    Dietary Restrictions: ${diet.toString()}

    generate it in the following json format:
    {
      "title": "Recipe Title",
      "ingredients": [
        {
          "name": "Ingredient Name",
          "quantity": "Ingredient Quantity"
        }
      ],
      "instructions": {
        "narrative": "Instruction Narrative",
        "cookingTime": "Cooking Time",
        "mealType": "Meal Type",
        "dietaryRestrictions": "Dietary Restrictions",
        "tenWordSummary": "10-Word Recipe Summary"
      }
    }
    `
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000
    });
    
    const response = JSON.parse(completion.data.choices[0].text);


    var recipeSummary = response.instructions.tenWordSummary.toString();
    recipeSummary.split(" ").join("%20");

    const photoUrl = "https://image.pollinations.ai/prompt/" + recipeSummary;

    //TODO: only save the recipe if user clicks on the "like" button

    const instruction = new Recipe.instructionModel({
      narrative: response.instructions.narrative,
      cookingTime: response.instructions.cookingTime,
      mealType: response.instructions.mealType,
      diet: response.instructions.diet,
    })
    await instruction.save();
    const recipe = new Recipe.recipeModel({
      title: response.title,
      ingredients: response.ingredients,
      instruction: response.instruction,
      photo: photoUrl,
      createdBy: user._id,
    });
    await recipe.save();

    user.createdRecipes.push(recipe._id);
    await user.save();

    res.status(201).json(recipe);

     
  })

  export const modifyRecipe = asyncHandler(async (req,res) => {  });

  export default { createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, generateRecipe, modifyRecipe };