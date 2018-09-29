const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");
const bcrypt = require("bcrypt");
const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const passport = require("passport");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.json(res.user);
});

router.get("/freelance", function(req, res, next) {
  res.render("freelance");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("E-mail not recognised."),
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be longer than 8 characters.")
  ],
  function(req, res) {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      res.send(errors.array);
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
          res.send(newUser);
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
);

router.get("/login", function(req, res) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "login" }),
  function(req, res, next) {
    if (req.user) {
      res.send(
        "User completely logged in. (username: " + req.user.username + ")"
      );
    } else {
      res.send("User logged in, but sessions are not being stored.");
    }
  }
);

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
