const Cafe = require("../models/Cafe");

exports.getAllCafes = async (req, res) => {
  const cafes = await Cafe.find({});

  res.status(200).json({ success: true, data: cafes });
};
