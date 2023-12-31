import mongoose from "mongoose";
import { ReviewSchema } from "./review.js";

const IngredientSchema = new mongoose.Schema({
  name: String,
  quantity: String,
  brand: String,
});

const InstructionSchema = new mongoose.Schema({
  narrative: { type: String, required: true },
  cookingTime: { type: String, required: true },
  servingSize: { type: String, required: true, default: "2 people" },
  cookingUtensils: [{ type: String }],
  mealType: { type: String },
  diet: [
    {
      type: String,
      default: "none",
    },
  ],
});

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [IngredientSchema],
  instruction: InstructionSchema,
  photo: { type: String, required: true },
  reviews: [ReviewSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isGenerated: { type: Boolean },
  tags: [{ type: String }],
});

const recipeModel = new mongoose.model("Recipe", RecipeSchema);
const ingredientModel = new mongoose.model("Ingredient", IngredientSchema);
const instructionModel = new mongoose.model("Instruction", InstructionSchema);

export default { recipeModel, ingredientModel, instructionModel };
