import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema({
    text: String,
    rating: {type:Number, required:true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdFor: {type: mongoose.Schema.Types.ObjectId, ref: "Recipe", required: true }
})

const reviewModel = new mongoose.model('Review', ReviewSchema);

export default {reviewModel, ReviewSchema};