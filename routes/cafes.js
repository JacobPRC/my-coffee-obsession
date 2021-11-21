const express = require("express");

const {
  getAllCafes,
  getCafe,
  createCafe,
  updateCafe,
  deleteCafe,
} = require("../controllers/cafes");

const router = express.Router();

router.route("/").get(getAllCafes);

router.route("/:id").get(getCafe).put(updateCafe).delete(deleteCafe);

router.route("/new").post(createCafe);

module.exports = router;
