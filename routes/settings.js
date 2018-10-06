const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const User = require("../models/user");
const passport = require("passport");
const _helpers = require("../auth/_helpers");


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
  var errors = req.validationErrors();
  res.render("editProfile", {user: user});
});

router.post("/profile", async function(req, res, next) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  req.checkBody("email", "E-mail is not in a valid format.").isEmail();
  if(req.body.password) {
    req
      .checkBody("password", "Password must be at least 8 characters.")
      .isLength({ min: 8 });
    req
      .checkBody("confirm", "Password does not match the confirmation")
      .equals(req.body.confirm);
  }
  var errors = req.validationErrors();
  if (errors) {
    console.log("error!");
    res.render("editProfile", {errors: errors, user: user});
  } else {
    console.log("success!");
  }
    
/*  let saved = false;
  if(!req.body.password)
    delete req.body.old_password;
    delete req.body.password;
    delete req.body.confirm;
    let updatedUser = await User.query().updateAndFetchById(user.id, req.body);
    saved = true;
  else
    
  if(saved)
    res.redirect("/profile/");*/
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
