import User from "../mongodb/models/user.js";
import asyncHandler from "express-async-handler";
import nodemailer from 'nodemailer';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400).json({status:400, message: 'User already exists'});
      throw new Error('User already exists')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })
  
    if (user) {
      res.status(201).json({
          user,
          token: generateToken(user._id)
      })
    } else {
      res.status(400).json({status:400});
      throw new Error('Invalid user data')
    }
  });

  const uploadAvatar = asyncHandler(async (req, res) => {
    try {
      const user = req.user;

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      console.log(req.file);
      user.avatar = req.file ? req.file.path : null;
  
      await user.save();
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
        user,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({status:400, message:'Invalid credentials.'});
      throw new Error('Invalid credentials')
    }
  })


// @desc    Forgot Password
// @route   POST /api/v1/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ status: 404, message: 'User not found' });
    throw new Error('User not found');
  }

  const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  user.resetToken = resetToken;
  user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'ataycanpolat@gmail.com',
      pass: 'zingvjtfvhkufzul',
    },
  });

  const resetPasswordEmail = `
  <p>You have requested to reset your password. Please click on the following link to reset your password:</p>
  <a href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>`;


  const mailOptions = {
    from: 'team.recipebot@gmail.com',
    to: email,
    subject: 'Password Reset',
    html: resetPasswordEmail,
    };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).json({ status: 500, message: 'Failed to send password reset email' });
    } else {
      console.log('Password reset email sent:', info.response);
      res.status(200).json({ status: 200, message: 'Password reset email sent successfully' });
    }
  });
});

// @desc    Reset Password
// @route   POST /api/v1/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;


  const user = await User.findOne({ resetToken: token });
  console.log(user.resetToken);
  console.log(token);
  console.log(user.resetToken===token)

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)


  user.password = hashedPassword;
  user.resetToken = undefined;
  await user.save();

  res.status(200).json({ status: 200, message: 'Password reset successful' });
});


// @desc    Get user profile by id
// @route   GET /api/users
// @access  Private
const getUserInfoById = async (req, res) => {
  const user = req.user;
  res.json({user})
};

//TODO: update of the default settings
const updateUserInfoById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, avatar, createdRecipes, savedRecipes, measurmentSystem, diet} =
            req.body;

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

export { createUser, loginUser, forgotPassword, resetPassword, uploadAvatar, getUserInfoById, updateUserInfoById };
