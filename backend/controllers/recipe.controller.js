import Recipe from "../mongodb/models/recipe.js";
import asyncHandler from "express-async-handler";
import axios from "axios";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { Configuration, OpenAIApi } = require("openai");

export const createRecipe = asyncHandler(async (req, res) => {
  try {
    const { title, ingredients, instruction, photo, isGenerated, tags } =
      req.body;
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const formattedTags = tags.map(tag => Array.isArray(tag) ? tag.join(", ") : tag);

    const recipe = new Recipe.recipeModel({
      title: title,
      ingredients: ingredients,
      instruction: instruction,
      photo: photo,
      isGenerated: isGenerated ? isGenerated : false,
      tags: formattedTags,
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
      query.$and = [
        {
          "ingredients.name": {
            $regex: includeIngredients.join("|"),
            $options: "i",
          },
        },
      ];
    }

    if (excludeIngredients && excludeIngredients.length > 0) {
      const excludeQuery = {
        "ingredients.name": {
          $nin: excludeIngredients.map(
            (ingredient) => new RegExp(ingredient, "i")
          ),
        },
      };

      if (query.$and) {
        query.$and.push(excludeQuery);
      } else {
        query.$and = [excludeQuery];
      }
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
    // console.log("lista", title, ingredients, instruction, photo);
    const user = req.user;
    const userId = user.id;

    const recipe = await Recipe.recipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
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
    const userId = user.id;
    const { recipeId } = req.body;

    const recipe = await Recipe.recipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.createdBy.toString() !== userId) {
      return res.status(401).json({ error: "Unauthorized access jj" });
    }

    await recipe.deleteOne();

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
    console.log(user);

    // extract variables from request.body + handle default/empty values

    // REQUIRED
    const ingredients = req.body.ingredients || [];
    const servingSize = req.body.servingSize || "any";

    // OPTIONAL
    const ingredientsExcl = req.body.ingredientsExcl || [];

    const utensils = req.body.utensils || (user ? user.defaultRecipeSettings.utensils : []) || [];

    const cookingTime = req.body.cookingTime || "any";

    const diet =
      req.body.diet || (user ? user.defaultRecipeSettings.dietaryRestriction : []) || [];

    const mealType = req.body.mealType || "any";

    const measurement =
      req.body.measurement ||
      (user ? user.defaultRecipeSettings.measurementSystem : []) || "metric";

    const allergies =
      req.body.allergies || (user ? user.defaultRecipeSettings.allergies : []) || [];

    const additionalNotes = req.body.additionalNotes || "";

    const prompt = `
    Generate me a recipe
  
    Ingredients: ${ingredients.toString()},
    Ingredients NOT to include: ${ingredientsExcl.toString()},
    Serving Size: ${servingSize.toString()},
    Cooking Utensils: ${utensils.toString()},
    Cooking Time: ${cookingTime.toString()},
    Dietary Restrictions: ${diet.toString()},
    Allergies: ${allergies.toString()},
    Meal Type: ${mealType.toString()},
    Additional notes: ${additionalNotes.toString()}
  
    For the brands of ingredients:
    - If the ingredient is one of {"yoghurt", "butter", "milk"}, use the brand "Weihenstephan".
    - If the ingredient is a legume or rice, use the brand "Naturkind".
    - If the ingredient is one of {"mayonnaise", "ketchup", "mustard"}, or a similar sauce, use the brand "Heinz".
    - If the ingredient is "soy sauce", use the brand "Kikkoman".
    - If the ingredient is one of {"almond milk", "soy milk", "oat milk"}, use the brand "Alpro".
    - If the ingredient is one of {"cream cheese", "skyr"}, use the brand "Exquisia".
    - If the ingredient is a nut butter (e.g., peanut butter, almond butter), use the brand "Calve".
    - If the ingredient is a deli or a meat, use the brand "Vinzenzmurr".
    - If the ingredient is one of {"oat", "oats", "oatmeal", "müsli", "muesli", "granola"}, use the brand "Köln".
    - If the ingredient is "beer", use the brand "Giesinger".
    - If the ingredient is "protein powder" or any other supplementary bodybuilding product, use the brand "ProteinWorks".
    - If the ingredient is "olive oil", use the brand "Vignoli Extra Virgin".
    - If the ingredient is a seafood, use the brand "Iglo".
    - If none of the above apply, leave the brand empty.
      
  
    Measurement System: As measurement system for the ingredient quantities, use  ${measurement.toString()}.
    If necessary for the recipe, feel free to add other ingredients as well, then add them to the JSON under ingredients as well.
    If there are ingredients to include that violate the dietary restriction, then don't include them
    Enumerate each step of the cooking narrative.
    The cooking time of the generated recipe should always be one of these values: {"under 10 minutes", "10-20 minutes", "under 30 minutes", "under 1 hour", "under 2 hours"}.
    Get inspiration from already existing recipes all around the world.
  
    Generate it in the following JSON format:
  
    {
      "title": ${
        req.body.title !== null &&
        req.body.title !== undefined &&
        req.body.title !== ""
          ? req.body.title.toString()
          : '"Creative Recipe Title"'
      },
      "ingredients": [
        {
          "name": "Ingredient Name",
          "quantity": "Ingredient Quantity",
          "brand": "Brand of the ingredient"
        }
      ],
      "instruction": {
        "narrative": "Enumerated Instruction Narrative: 1. Step 1 2. Step 2 ... ",
        "cookingTime": "Cooking Time",
        "servingSize": "Serving Size",
        "mealType": "Meal Type",
        "diet": "Dietary Restrictions"
      },
      "twentyWordSummary": "20-Word Recipe Description for Image Generation",
      "measurementSystem": "Measurement System"
    }
  `;

    // send prompt to ChatGPT
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
    });

    // get response from ChatGPT
    const responseRaw = completion.data.choices[0].text
      .trim()
      .replace("Recipe JSON:", "");
    const response = JSON.parse(responseRaw);
    console.log("RESPONSE", response);

    // add photoUrl and tags to response
    const photoUrl =
    "https://image.pollinations.ai/prompt/" +
    encodeURIComponent(response.twentyWordSummary);

    // Download the image
    const imageResponse = await axios.get(photoUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(imageResponse.data).toString('base64');
    const dataURI = `data:image/png;base64,${imageData}`;

    const tags = [
      response.instruction.mealType,
      ...(response.instruction.diet !== ""
        ? response.instruction.diet.split(",").map(item => item.trim())
        : ["Not diet specific"]),
      response.instruction.cookingTime,
    ];
    

    const instruction = new Recipe.instructionModel({
      narrative: response.instruction.narrative,
      cookingTime: response.instruction.cookingTime,
      mealType: response.instruction.mealType,
      diet: response.instruction.diet,
    });

    const recipe = new Recipe.recipeModel({
      title: response.title,
      ingredients: response.ingredients,
      instruction: response.instruction,
      photo: dataURI,
      createdBy: user ? user._id : "",
      isGenerated: true,
      tags: tags,
    });

    const allData = {
      recipe: recipe,
      instruction: instruction,
    };

    console.log("ALL DATA", allData);



    res.status(201).json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const saveRecipe = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const recipeId = req.body.recipeId;

    if (!recipeId) {
      return res.status(404).json({ error: "Recipe ID not provided" });
    }

    const recipe = await Recipe.recipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.createdBy.toString() === user._id.toString()) {
      return res.status(400).json({
        error:
          "You can't save your own recipe, it's already listed under created recipes",
      });
    }

    user.savedRecipes.push(recipeId);
    await user.save();

    res.status(201).json({ message: "Recipe saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const removeRecipe = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const recipeId = req.body.recipeId;
    console.log(recipeId);

    if (!recipeId) {
      return res.status(404).json({ error: "Recipe ID not provided" });
    }

    user.savedRecipes.pull(recipeId);

    user.save().then(() => {
      res.status(200).json({ message: "Recipe removed successfully!" });
    });
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

export const uploadRecipeImage = asyncHandler(async (req, res) => {
  try {
    const recipe = rqe.recipe;

    console.log(req.file);
    recipe.image = req.file ? req.file.path : null;

    await recipe.save();

    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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
  removeRecipe,
  uploadRecipeImage,
};
