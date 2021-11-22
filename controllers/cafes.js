const Cafe = require("../models/Cafe");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");

// GET /cafes/
exports.getAllCafes = asyncHandler(async (req, res, next) => {
  const cafes = await Cafe.find({});

  res.status(200).json({ success: true, data: cafes });
});

// GET /cafes/:id
exports.getCafe = asyncHandler(async (req, res, next) => {
  const cafe = await Cafe.findById(req.params.id);

  if (!cafe) {
    return next(
      new ErrorResponse(`Can't find cafe with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: cafe });
});

// POST /cafes/new
exports.createCafe = asyncHandler(async (req, res, next) => {
  try {
    const cafe = await Cafe.create(req.body);
    res.status(200).json({ success: true, data: cafe });
  } catch {
    next(new ErrorResponse(`This cafe is already listed on our site`, 400));
  }
});

// PUT /cafes/:id
exports.updateCafe = asyncHandler(async (req, res, next) => {
  const cafe = await Cafe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cafe) {
    return next(
      new ErrorResponse(`Can't find cafe with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: cafe });
});

// DELETE /cafes/:id
exports.deleteCafe = asyncHandler(async (req, res, next) => {
  const cafe = await Cafe.findByIdAndDelete(req.params.id);

  if (!cafe) {
    return next(
      new ErrorResponse(`Can't find cafe with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: [] });
});
