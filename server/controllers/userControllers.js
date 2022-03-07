const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @api endpoint /api/users/login
// @access public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User with that email exists");
  } else {
    const createdUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id),
    });
  }
});

// @api endpoint /api/users/login
// @access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email Or Password");
  }
});

module.exports = { register, login };
