const express = require("express");

const {
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/new").post(createUser);

module.exports = router;
