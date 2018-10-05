const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const { sanitizeBody } = require("express-validator/filter");
const bcrypt = require("bcrypt");
const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const Review = require("../models/review");
const passport = require("passport");
const authController = require("../controllers/authController");

router.use(expressValidator());

router.get("/", function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/profile");
});

router.get("/profile", async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  res.render("editProfile", {
    user: user
  });
});

router.post("/profile", async function(req, res, next) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  let updatedUser = await User.query().updateAndFetchById(user.id, req.body);
  res.redirect("/users/" + user.username);
});
/*=======
router.get("/profile", async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  res.render("profile", { user: user });
});

router.get("/profile/edit", async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  res.render("editProfile", { user: user });
});

router.post("/profile/edit", function(req, res, next) {
  res.redirect("/users/profile");
});

router.get("/profile/:username", async function(req, res) {
  let user = await User.query()
    .where("username", req.params.username)
    .first();
  res.render("profile", { user: user });
});*/

module.exports = router;
