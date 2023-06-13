import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema({
    text: String,
    rating: {type:Number, required:true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const reviewModel = new mongoose.model('Review', ReviewSchema);

export default {reviewModel, ReviewSchema};