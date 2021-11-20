const mongoose = require("mongoose");

const CafeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name of cafe"],
  },
  address: String,
  bio: String,
  picture: {
    type: String,
    default: "no-pic.jpeg",
  },
  tags: [String],
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Cafe", CafeSchema);
