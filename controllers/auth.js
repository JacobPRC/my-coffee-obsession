const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const dotenv = require("dotenv");

// POST /user/new
exports.registerUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendTokenResponse(user, 200, res);
});

// POST user/login
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please privide an email and a password", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorResponse("Invalid credentials", 401));

  // Checks if credentials match using matchPassword method on User model
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));

  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPRIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
