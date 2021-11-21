const User = require("../models/User");

// GET /profile/:userId
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.userId);

  res.status(200).json({ success: true, data: user });
};

// POST /profile/new
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(200).json({ success: true, data: user });
};

// PUT /profile/:userId
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: user });
};

// DELETE /profile/:userId
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.userId);

  res.status(200).json({ success: true, data: [] });
};
