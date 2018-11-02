const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const User = require("../models/user");
const passport = require("passport");
const _helpers = require("../auth/_helpers");
var authMiddleware = require("../middlewares/authMiddleware");

router.use(expressValidator());

router.get("/", function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/profile");
});

router.get("/profile", authMiddleware.isAuthenticated, async function(
  req,
  res
) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  var errors = req.validationErrors();
  let title = "Edit Profile | JetFree by JainsBret";
  res.render("profile/edit", {
    title: title,
    user: user
  });
});

router.post("/profile", authMiddleware.isAuthenticated, async function(
  req,
  res,
  next
) {
  var pass = true;
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  req.checkBody("email", "E-mail is not in a valid format.").isEmail();
  if (req.body.password) {
    req
      .checkBody("password", "Password must be at least 8 characters.")
      .isLength({
        min: 8
      });
    req
      .checkBody("confirm", "Password does not match the confirmation")
      .equals(req.body.confirm);
    pass = _helpers.comparePassSync(req.body.old_password, user.password);
  }
  var errors = req.validationErrors();
  if (errors || !pass) {
    console.log("error!");
    let failed = !pass;
    let title = "Edit Profile | JetFree by JainsBret";
    res.render("editProfile", {
      title: title,
      errors: errors,
      failed: failed,
      user: user
    });
  } else {
    delete req.body.old_password;
    delete req.body.confirm;

    if (!req.body.password) {
      delete req.body.password;
      let updatedUser = await User.query().updateAndFetchById(
        user.id,
        req.body
      );
      res.redirect("/profile/");
    } else {
      _helpers
        .hashPass(req.body.password)
        .then(hashed => {
          console.log(hashed);
          req.body.password = hashed;
          return User.query().updateAndFetchById(user.id, req.body);
        })
        .then(updatedUser => {
          res.redirect("/profile/");
        });
    }
  }
});

module.exports = router;
