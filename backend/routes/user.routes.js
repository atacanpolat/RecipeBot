import express from "express";
import { upload } from "../middleware/helperFunctionsMiddleware.js";
import {
    createUser,
    loginUser,
    getUserInfoById,
    updateUserInfoById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', upload.single('avatar'), createUser);
router.get('/:id', getUserInfoById);
router.patch('/:id', updateUserInfoById);

export default router;