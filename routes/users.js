const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const { sanitizeBody } = require("express-validator/filter");
const bcrypt = require("bcrypt");
const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const passport = require("passport");

router.use(expressValidator());

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.redirect("/");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {
  req.checkBody("email", "E-mail is not in a valid format.").isEmail();
  req
    .checkBody("password", "Password must be at least 8 characters.")
    .isLength({ min: 8 });
  req
    .checkBody("confirm", "Password does not match the confirmation")
    .equals("confirm");
  var errors = req.validationErrors();
  if (errors) {
    res.render("register", { errors: errors });
  } else {
    _helpers
      .hashPass(req.body.password)
      .then(hashed => {
        req.body.password = hashed;
        delete req.body.confirm;
        delete req.body.agreement;
        return User.query().insert(req.body);
      })
      .then(newUser => {
        res.redirect("/users/login");
      })
      .catch(error => {
        throw new Error(error);
      });
  }
});

router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login");
});

router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect(req.baseUrl + "/login?error=failed");
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

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
