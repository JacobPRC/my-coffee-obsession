const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");

// GET /profile/:userId
exports.getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return next(
      new ErrorResponse(`Can't find user with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});

// PUT /profile/:userId
exports.updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return next(
      new ErrorResponse(`Can't find user with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});

// DELETE /profile/:userId
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);

  if (!user) {
    return next(
      new ErrorResponse(`Can't find user with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: [] });
});
