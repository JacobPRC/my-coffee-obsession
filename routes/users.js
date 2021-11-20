const express = require("express");

const { getUserById } = require("../controllers/users");

const router = express.Router();

router.route("/:userId").get(getUserById);

module.exports = router;
