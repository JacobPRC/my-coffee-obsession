const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name of user"],
  },
  email: {
    type: String,
    required: [true, "Please add email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add password"],
    minlength: 6,
    select: false,
  },
  loggedIn: {
    type: Boolean,
    default: false,
  },
  likedCafes: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("User", UserSchema);
