const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const { sanitizeBody } = require("express-validator/filter");
const bcrypt = require("bcrypt");
const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const passport = require("passport");
const authController = require("../controllers/authController");

router.use(expressValidator());

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logout);
router.post("/logout", authController.logout);

router.get("/resetPassword", function(req, res) {
  res.render("resetPassword");
});

router.post("/resetPassword", function(req, res) {
  const username = req.body.username;
  const answer = req.body.answer.toLowerCase();

  console.log("click");
  if (
    answer == "o(n^2)" ||
    answer == "n^2" ||
    answer == "o(n**2)" ||
    answer == "n**2"
  ) {
    console.log("OK");
  } else {
    console.log("noob");
  }
  res.render("resetPassword");
});

module.exports = router;
