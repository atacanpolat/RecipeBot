import express from "express";

// Import all controllers
import {
    createUser,
    loginUser,
    getUserInfoById,
    updateUserInfoById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(createUser);
router.route('/:id').get(getUserInfoById);
router.route('/:id').patch(updateUserInfoById);

export default router;