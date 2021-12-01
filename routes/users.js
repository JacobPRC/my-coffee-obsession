const express = require("express");

const { getUserById, updateUser, deleteUser } = require("../controllers/users");

const router = express.Router();

router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
