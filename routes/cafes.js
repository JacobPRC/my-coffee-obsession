const express = require("express");

const {
  getAllCafes,
  getCafe,
  createCafe,
  updateCafe,
  deleteCafe,
} = require("../controllers/cafes");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(getAllCafes);

router.route("/:id").get(getCafe).put(updateCafe).delete(deleteCafe);

router.route("/new").post(protect, createCafe);

module.exports = router;
