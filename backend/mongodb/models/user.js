import mongoose from "mongoose";

const diet = ['none', 'gluten-free', 'lactose-free', 'kosher', 'seafood', 'halal', 'vegetarian', 'vegan', 'keto', 'low-calorie']


const UserSchema = new mongoose.Schema({
    firstName: { type: String, requried: true },
    lastName: {type: String},
    email: { type: String, requried: true },
    password: {type:String, required:true},
    avatar: { type: String, requried: true },
    createdRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    reviewsWritten: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    defaultRecipeSettings: {
        metricSystem: {
            type:String, 
            enum:['metric', 'imperial'], 
            default:'metric'
        },
        dietaryRestrictions: [{
            type:String, 
            enum:diet, 
            default:'none'
        }]
    }
})

const userModel = mongoose.model('User', UserSchema);

export default userModel;