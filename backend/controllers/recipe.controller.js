import Recipe from "../mongodb/models/recipe.js";
import asyncHandler from "express-async-handler";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Configuration, OpenAIApi } = require("openai");

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
      isGenerated: false,
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

export const filterRecipes = asyncHandler(async (req, res) => {
  try {
    const {
      keyword,
      includeIngredients,
      excludeIngredients,
      mealType,
      dietaryRestriction,
      servingSize,
      cookingUtensils,
      activeTab,
    } = req.body;

    const user = req.user;
    const query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (includeIngredients && includeIngredients.length > 0) {
      query["ingredients.name"] = {
        $regex: includeIngredients.join("|"),
        $options: "i",
      };
    }

    if (excludeIngredients && excludeIngredients.length > 0) {
      query["ingredients.name"] = {
        $regex: excludeIngredients.join("|"),
        $options: "i",
      };
    }

    if (mealType) {
      query["instruction.mealType"] = mealType;
    }

    if (dietaryRestriction) {
      query["instruction.diet"] = dietaryRestriction;
    }

    if (servingSize) {
      query["instruction.servingSize"] = servingSize;
    }

    if (cookingUtensils && cookingUtensils.length > 0) {
      query["instruction.cookingUtensils"] = { $in: cookingUtensils };
    }

    if (activeTab == "saved") {
      query._id = { $in: user.savedRecipes };
    }
    if (activeTab == "created") {
      query._id = { $in: user.createdRecipes };
    }

    const recipes = await Recipe.recipeModel.find(query);

    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error filtering recipes:", error);
    res.status(500).json({ message: "Failed to filter recipes" });
  }
});

export const getCreatedRecipes = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const createdRecipes = await Recipe.recipeModel
      .find({ _id: { $in: user.createdRecipes } })
      .populate("reviews");
    res.status(200).json(createdRecipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getSavedRecipes = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const savedRecipes = await Recipe.recipeModel
      .find({ _id: { $in: user.savedRecipes } })
      .populate("reviews");
    res.status(200).json(savedRecipes);
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

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const generateRecipe = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const {
      ingredients,
      servingSize,
      utensils,
      cookingTime,
      diet,
      mealType,
      measurement,
    } = req.body;
    const prompt = `
      Generate me a recipe
  
      Ingredients: ${ingredients.toString()},
      Serving Size: ${servingSize.toString()},
      Cooking Utensils: ${utensils.toString()},
      Cooking Time: ${cookingTime.toString()},
      Dietary Restrictions: ${diet.toString()},
      Meal Type: ${mealType.toString()},
      Brand of the ingredient: If ingredient is one of {"yoghurt", "butter", "milk"}, then "Weihenstephan"; if ingredient is "cream cheese", then "Exquisia"; if ingredient is one of {"oat", "oats", "oatmeal"}, then "Köln"; otherwise leave it empty

  
      generate it in the following json format:

      {
        "title": "Title",
        "ingredients": [
          {
            "name": "Ingredient Name",
            "quantity": "Ingredient Quantity",
            "brand": "Brand of the ingredient"
          }
        ],
        "instruction": {
          "narrative": "Instruction Narrative",
          "cookingTime": "Cooking Time",
          "servingSize": "Serving Size",
          "mealType": "Meal Type",
          "diet": "Dietary Restrictions"
        },
        "tenWordSummary": "10-Word Recipe Summary",
        "measurementSystem": "Measurement System"
      }

      Measurement System: As measurement system for the ingredient quantities, use  ${measurement.toString()}.
      If there are any other ingrtedients that are used in the recipe other than the ingredients listed above, then add them to the JSON under ingredients as well.
      `;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
    });

    console.log(completion.data.choices[0].text);
    const response = JSON.parse(completion.data.choices[0].text);
    var recipeSummary = response.tenWordSummary.toString();
    recipeSummary = recipeSummary.replaceAll(/ /g, "%20");

    response.ingredients.name = response.ingredients.name
      .charAt(0)
      .toLowerCase();

    const photoUrl = "https://image.pollinations.ai/prompt/" + recipeSummary;
    response.photoUrl = photoUrl;
    const tags = [
      response.instruction.mealType,
      response.instruction.diet,
      response.instruction.cookingTime,
    ];

    const instruction = new Recipe.instructionModel({
      narrative: response.instruction.narrative,
      cookingTime: response.instruction.cookingTime,
      mealType: response.instruction.mealType,
      diet: response.instruction.diet,
    });
    await instruction.save();

    const recipe = new Recipe.recipeModel({
      title: response.title,
      ingredients: response.ingredients,
      instruction: response.instruction,
      photo: response.photoUrl,
      createdBy: user._id,
      isGenerated: true,
      tags: tags,
    });
    await recipe.save();

    user.createdRecipes.push(recipe._id);
    await user.save();

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Can'a sor
export const saveRecipe = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const recipe = await Recipe.recipeModel
      .findById(req.params.id)
      .populate("reviews");
    console.log(recipe);

    if (!recipe) {
      return res.status(404).json({ error: "recipe not found" });
    }

    if (recipe.createdBy == user._id) {
      user.createdRecipes.push(recipe._id);
    } else {
      user.savedRecipes.push(recipe._id);
    }
    await user.save();

    res.status(201).send("Recipe saved successfully!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Can'a sor
export const modifyRecipe = asyncHandler(async (req, res) => {
  const user = req.user;
  const {
    ingredients,
    servingSize,
    utensils,
    time,
    diet,
    mealType,
    measurement,
  } = req.body;

  Recipe.recipeModel.findById(req.params.id).then((res) => {
    const recipe = res.toJSON();
  });
});

export default {
  createRecipe,
  getAllRecipes,
  getSavedRecipes,
  getCreatedRecipes,
  filterRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  generateRecipe,
  modifyRecipe,
  saveRecipe,
};
