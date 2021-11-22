const ErrorResponse = require("../utils/errorResponse");

const errHandler = (err, req, res, next) => {
  let error = { ...err };
  console.log(err.stack);

  error.message = err.message;

  //  Incorrect ID Error
  if (err.name === "CastError") {
    const message = error.message.includes("User")
      ? `User id: ${err.value} was not found`
      : error.message.includes("Cafe")
      ? `Cafe id: ${err.value} was not found`
      : `resource id: ${err.value} was not found`;
    error = new ErrorResponse(message, 404);
  }

  //   Duplicate Fields Error
  if (err.code == 11000) {
    error = new ErrorResponse("Duplicate entry found in database", 400);
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server error" });
};

module.exports = errHandler;
