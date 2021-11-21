const Cafe = require("../models/Cafe");

// GET /cafes/
exports.getAllCafes = async (req, res) => {
  const cafes = await Cafe.find({});

  res.status(200).json({ success: true, data: cafes });
};

// GET /cafes/:id
exports.getCafe = async (req, res) => {
  const cafe = await Cafe.findById(req.params.id);

  res.status(200).json({ success: true, data: cafe });
};

// POST /cafes/new
exports.createCafe = async (req, res) => {
  const cafe = await Cafe.create(req.body);

  res.status(200).json({ success: true, data: cafe });
};

// PUT /cafes/:id
exports.updateCafe = async (req, res) => {
  const cafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: cafe });
};

// DELETE /cafes/:id
exports.deleteCafe = async (req, res) => {
  const cafe = await Cafe.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, data: [] });
};
