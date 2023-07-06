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

    // extract variables from request.body + handle default/empty values

    // REQUIRED
    // ingredients (include)
    let ingredients = [];
    if ("ingredients" in req.body) {
      ingredients = req.body.ingredients;
    } else {
      throw new Error("ingredients not found in request body");
    }

    // servingSize
    let servingSize = "";
    if ("servingSize" in req.body) {
      servingSize = req.body.servingSize;
    } else {
      throw new Error("servingSize not found in request body");
    }

    // OPTIONAL
    const ingredientsExcl = req.body.ingredientsExcl || [];
    const utensils =
      req.body.utensils || user.defaultRecipeSettings.utensils || [];
    const cookingTime = req.body.cookingTime || "any";
    const diet =
      req.body.diet || user.defaultRecipeSettings.dietaryRestriction || "none";
    const mealType = req.body.mealType || "any";
    const measurement =
      req.body.measurement ||
      user.defaultRecipeSettings.measurementSystem ||
      "metric";
    const allergies =
      req.body.allergies || user.defaultRecipeSettings.allergies || [];

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
      Brand of the ingredient: If ingredient is one of {"yoghurt", "butter", "milk"}, then "Weihenstephan"; if ingredient is "cream cheese", then "Exquisia"; if ingredient is one of {"oat", "oats", "oatmeal"}, then "Köln"; if ingredient is "beer", then "Augustiner"; if ingredient is "protein powder" or any other supplementary bodybuilding product, then "ProteinWorks" otherwise leave it empty

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
          "narrative": "Enumerated Instruction Narrative",
          "cookingTime": "Cooking Time",
          "servingSize": "Serving Size",
          "mealType": "Meal Type",
          "diet": "Dietary Restrictions"
        },
        "tenWordSummary": "10-Word Recipe Summary",
        "measurementSystem": "Measurement System"
      }

      Measurement System: As measurement system for the ingredient quantities, use  ${measurement.toString()}.
      If there are any other ingrtedients that are used in the recipe other than the ingredients listed above, then add them to the JSON under ingredients as well.`;

    // send prompt to ChatGPT
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
    });

    // get response from ChatGPT
    const response = JSON.parse(completion.data.choices[0].text);

    // const sampleResponse = {
    //   title: "Tomato Rice Basil Milk",
    //   ingredients: [
    //     {
    //       name: "Tomato",
    //       quantity: "4 tomatoes",
    //       brand: "",
    //     },
    //     {
    //       name: "Rice",
    //       quantity: "2 cups of uncooked rice",
    //       brand: "",
    //     },
    //     {
    //       name: "Basil",
    //       quantity: "1/4 cup of fresh basil, diced",
    //       brand: "",
    //     },
    //     {
    //       name: "Milk",
    //       quantity: "2 cups of milk",
    //       brand: "Weihenstephan",
    //     },
    //   ],
    //   instruction: {
    //     narrative:
    //       "In a large pan over medium heat, add tomatoes and cook until softened. Add the rice and basil and cook for 3 minutes, stirring occasionally. Reduce heat and add the milk and stir until the milk is absorbed. Cook for 5 more minutes and remove from heat. Serve warm. Enjoy!",
    //     cookingTime: "Under 30 minutes",
    //     servingSize: "4 people",
    //     mealType: "main",
    //     diet: "kosher",
    //   },
    //   tenWordSummary: "Tomato, Rice, Basil and Milk dish.",
    //   measurementSystem: "Metric",
    // };

    // add photoUrl and tags to response

    const photoUrl =
      "https://image.pollinations.ai/prompt/" +
      encodeURIComponent(response.tenWordSummary);
    response.photoUrl = photoUrl;
    const tags = [
      response.instruction.mealType,
      response.instruction.diet
        ? response.instruction.diet
        : "Not diet specific",
      response.instruction.cookingTime,
    ];

    const instruction = new Recipe.instructionModel({
      narrative: response.instruction.narrative,
      cookingTime: response.instruction.cookingTime,
      mealType: response.instruction.mealType,
      diet: response.instruction.diet,
    });
    // await instruction.save(); // OLD

    const recipe = new Recipe.recipeModel({
      title: response.title,
      ingredients: response.ingredients,
      instruction: response.instruction,
      photo: response.photoUrl,
      createdBy: user._id,
      isGenerated: true,
      tags: tags,
    });
    // await recipe.save();// OLD

    const allData = {
      recipe: recipe,
      instruction: instruction,
    };

    // user.createdRecipes.push(recipe._id);
    // await user.save();

    res.status(201).json(allData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const saveRecipe = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const recipe = req.body;
    console.log(recipe);

    if (!recipe) {
      return res.status(404).json({ error: "recipe not found" });
    }

    if (recipe.createdBy == user._id) {

    }
    const instruction = new Recipe.instructionModel({
      narrative: recipe.instruction.narrative,
      cookingTime: recipe.instruction.cookingTime,
      mealType: recipe.instruction.mealType,
      diet: recipe.instruction.diet,
    });
    await instruction.save();

    const recipeToSave = new Recipe.recipeModel({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instruction: recipe.instruction,
      photoUrl: recipe.photoUrl,
      createdBy: recipe.createdBy,
      isGenerated: recipe.isGenerated,
      tags: recipe.tags,
    });
    await recipeToSave.save();

    if (recipeToSave.createdBy == user._id) {
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
