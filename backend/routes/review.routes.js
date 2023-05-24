import express from "express";

import { createReview, updateReview, deleteReview } from "../controllers/review.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create', protect, createReview);
router.patch('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

export default router;