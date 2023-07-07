import express from "express";
import { upload } from "../middleware/helperFunctionsMiddleware.js";
import { protect } from '../middleware/authMiddleware.js';
import {
    createUser,
    loginUser,
    getUserInfoById,
    updateUserInfoById,
    uploadAvatar,
    forgotPassword,
    resetPassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/register',  createUser);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/upload', protect, upload.single('file'), uploadAvatar);
router.get('/', protect, getUserInfoById);
router.patch('/:id', protect, updateUserInfoById);

export default router;