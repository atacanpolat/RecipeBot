import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    text: String,
    rating: {type:Number, required:true},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
})

const reviewModel = mongoose.model('Review', ReviewSchema);

export default reviewModel;