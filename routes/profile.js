const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const User = require("../models/user");
const Review = require("../models/review");
const profileController = require("../controllers/profileController");

router.use(expressValidator());

router.get("/", function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/" + req.user.username);
});

router.get("/:username", profileController.viewProfile);

module.exports = router;
