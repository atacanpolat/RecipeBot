import mongoose from "mongoose";

const dietEnum = [
  "",
  "gluten-free",
  "lactose-free",
  "kosher",
  "seafood",
  "halal",
  "vegetarian",
  "vegan",
  "keto",
  "low-calorie",
];

const allegiesEnum = ["", "nuts", "milk", "shellfish", "egg", "peanut"];

const utensilsEnum = ["", "no oven", "no stove", "no blender", "no microwave"];

const UserSchema = new mongoose.Schema({
  firstName: { type: String, requried: true },
  lastName: { type: String },
  email: { type: String, requried: true },
  password: { type: String, required: true },
  avatar: { type: String, requried: true },
  createdRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  reviewsWritten: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  defaultRecipeSettings: {
    measurementSystem: {
      type: String,
      enum: ["metric", "imperial"],
      default: "metric",
    },
    dietaryRestrictions: [
      {
        type: String,
        enum: dietEnum,
        default: "",
      },
    ],
    allergies: {
      type: String,
      enum: allegiesEnum,
      default: "",
    },
    utensils: {
      type: String,
      enum: utensilsEnum,
      default: "",
    },
  },
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
