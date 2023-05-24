import mongoose from "mongoose";

const mealType = ['soup', 'starter', 'appetizer', 'main', 'salad', 'dessert']
const diet = ['none', 'gluten-free', 'lactose-free', 'kosher', 'seafood', 'halal', 'vegetarian', 'vegan', 'keto', 'low-calorie']

const IngredientSchema = new mongoose.Schema({
    name: String,
    quantity: String,
    brand: String, //TODO: brand maybe as an object?
});

const InstructionSchema = new mongoose.Schema({
    narrative: {type: String, required:true},
    cookingTime:{type:String, required:true},
    mealType: {
        type: String
    },
    diet: {
        type:String,
        enum:diet,
        default:'none'
    }
})

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [IngredientSchema],
    instruction: {InstructionSchema},
    photo: { type: String, required: true },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
});

const recipeModel = new mongoose.model("Recipe", RecipeSchema);
const ingredientModel = new mongoose.model("Ingredient", IngredientSchema)
const instructionModel = new mongoose.model("Instruction", InstructionSchema)

export default {recipeModel, ingredientModel, instructionModel};
