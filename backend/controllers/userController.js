import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Generate token
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc   Register a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // If user is created successfully
  if (user) {
    // Generate token
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Log out user and clear cookie
// @route   GET /api/users/logout
// @access  Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expiresIn: new Date(0) });
  res.json({ message: "Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // If user is found
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    // If user is not found
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // If user is found
  if (user) {
    // Update user
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // If password is provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save user
    const updatedUser = await user.save();

    // Generate token
    generateToken(res, updatedUser._id);

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

    // If user is not found
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // If user is found
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }
    await User.deleteOne({ _id: user._id });
    res.status(201).json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  // If user is found
  if (user) {
    res.status(200).json(user);

    // If user is not found
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  // If user is found
  if (user) {
    // Update user
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    // Save user
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

    // If user is not found
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
