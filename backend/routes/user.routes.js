import express from "express";
import { upload } from "../middleware/helperFunctionsMiddleware.js";
import { protect } from '../middleware/authMiddleware.js';
import {
    createUser,
    loginUser,
    getUserInfoById,
    updateUserInfoById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/login', loginUser);
//router.post('/register', upload.single('avatar'), createUser);
router.post('/register', createUser);
router.get('/:id', protect, getUserInfoById);
router.patch('/:id', protect, updateUserInfoById);

export default router;