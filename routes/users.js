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

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logout);
router.post("/logout", authController.logout);
router.get("/resetPassword", authController.resetPasswordGet);
router.post("/resetPassword", authController.resetPasswordPost);

router.get("/profile", function(req, res) {
  console.log(req.user);
  res.redirect(req.baseUrl + "/profile/" + req.user.username);
});

router.get("/profile/:username", async function(req, res) {
  let user = await User.query()
    .where("username", req.params.username)
    .first();
  console.log(user);
  let reviews = await Review.query().where("user_id", user.id);
  let reviewers = [];
  for (review in reviews) {
    reviewers.push(
      await User.query()
        .where("id", user.id)
        .first()
    );
  }
  res.render("profile", { user: user, reviews: reviews, reviewers: reviewers });
});

router.get("/profile/:username/edit", async function(req, res) {
  let user = await User.query()
    .where("username", req.params.username)
    .first();
  res.render("editProfile", {
    user: user
  });
});

router.post("/profile/:username/edit", async function(req, res, next) {
  let user = await User.query()
    .where("username", req.params.username)
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
