const express = require("express");

const { getAllCafes } = require("../controllers/cafes");

const router = express.Router();

router.route("/").get(getAllCafes);

module.exports = router;
