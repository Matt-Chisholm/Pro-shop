import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  res.send("auth user");
});

// @desc   Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

// @desc    Log out user and clear cookie
// @route   GET /api/users/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

// @desc    Get user profile
// @route   GET /api/users/profile

const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});
