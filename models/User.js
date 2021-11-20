const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name of user"],
  },
  loggedIn: {
    type: Boolean,
    default: false,
  },
  likedCafes: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("User", UserSchema);
