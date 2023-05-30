import User from "../mongodb/models/user.js";
import asyncHandler from "express-async-handler";

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }

// @desc    Register new user
// @route   POST /api/v1/users/register
// @access  Public
const createUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password} = req.body
  
    if (!firstName || !email || !password) {
      res.status(400).json({status:400, message: 'Please add all fields.'});
      throw new Error('Please add all fields')
    }
  
    if (password.length < 6) {
      res.status(400).json({
        message: 'Please provide a password with at least 6 characters',
        status:400
      })
    }
  
    // Check if user exists
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400).json({status:400, message: 'User already exists'});
      throw new Error('User already exists')
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      avatar: req.file ? req.file.path : null
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email,
        token: generateToken(user._id),
        status:201
      })
    } else {
      res.status(400).json({status:400});
      throw new Error('Invalid user data')
    }
  });


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({email: email})
  
    if (user == null)  {
      res.status(400).json({status:400, message:'Invalid Credentials'});
      throw new Error('Invalid credentials')
    }
  
    const passwordCorrect = await bcrypt.compare(password, user.password)
  
    if (user != null && passwordCorrect) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({status:400, message:'Invalid credentials.'});
      throw new Error('Invalid credentials')
    }
  })

// @desc    Get user profile by id
// @route   GET /api/users/:id
// @access  Private
const getUserInfoById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id })
            .populate("createdRecipes")
            .populate("savedRecipes");

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//TODO: update of the default settings
const updateUserInfoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, avatar, createdRecipes, savedRecipes, metricSystem, diet} =
            req.body;

        // console.log(req.body);
        // console.log(savedRecipes.map(({ _id }) => _id));

        await User.findByIdAndUpdate(
            { _id: id },
            {
                name,
                email,
                avatar,
                createdRecipes: createdRecipes ? createdRecipes.map(({ _id }) => _id) : [],
                savedRecipes: savedRecipes ? savedRecipes.map(({ _id }) => _id) : []
                
            }
        );

        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createUser, loginUser, getUserInfoById, updateUserInfoById };
