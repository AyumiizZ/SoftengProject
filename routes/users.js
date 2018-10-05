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
  res.redirect("/");
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
      .isLength({
        min: 8
      })
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
          res.redirect("/users/login");
        })
        .catch(error => {
          throw new Error(error);
        });
    }
  }
);

router.get("/login", function(req, res) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "login"
  }),
  function(req, res, next) {
    res.redirect("/");
  }
);

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

//<<<<<<< HEAD
router.get("/:username", async function (req, res) {
  let user = await User.query().where('username', req.params.username).first();
  res.render("profile", {user: user});
});

router.get("/:username/edit", async function (req, res) {
  let user = await User.query().where('username', req.params.username).first();
  res.render("editProfile", {user: user});
});

router.post("/:username/edit", async function (req, res, next) {
  let user = await User.query().where('username', req.params.username).first();
  res.redirect("/users/"+user.username);
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
>>>>>>> f541eb83863af9a1e999061bad0969b845a229be
});*/

module.exports = router;