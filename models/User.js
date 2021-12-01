const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const dotenv = require("dotenv");

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
  likedCafes: [mongoose.Schema.Types.ObjectId],
});

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match user entered password to hashed password in db
UserSchema.methods.matchPassword = async function (enteredPw) {
  return await bcrypt.compare(enteredPw, this.password);
};

module.exports = mongoose.model("User", UserSchema);
