const User = require("../models/User");

exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({ success: true, data: user });
};
