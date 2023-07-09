import express from "express";
import { upload } from "../middleware/helperFunctionsMiddleware.js";
import { protect } from '../middleware/authMiddleware.js';
import {
    createUser,
    loginUser,
    getUserInfoById,
    updateUserInfoById,
<<<<<<< Updated upstream
=======
    uploadAvatar,
    forgotPassword,
    resetPassword,
>>>>>>> Stashed changes
} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/login', loginUser);
<<<<<<< Updated upstream
//router.post('/register', upload.single('avatar'), createUser);
router.post('/register', createUser);
=======
router.post('/register',  createUser);
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/upload', protect, upload.single('file'), uploadAvatar);
>>>>>>> Stashed changes
router.get('/:id', protect, getUserInfoById);
router.patch('/:id', protect, updateUserInfoById);

export default router;