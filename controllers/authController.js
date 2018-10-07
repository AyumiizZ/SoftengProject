const { check, validationResult } = require("express-validator/check");
const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const passport = require("passport");

exports.registerGet = function(req, res) {
  res.render("register");
};
exports.registerPostCheck = [
  check("email")
    .isEmail()
    .withMessage("E-mail is not in a valid format.")
    .custom(async function(value) {
      User.query()
        .where("email", value)
        .then(user => {
          if (user.length > 0) {
            return false;
          } else {
            return true;
          }
        });
    })
    .withMessage("The E-mail is already in use"),
  check("username")
    .custom(async function(value) {
      const u = await User.query().where("username", value);
      if (u.length > 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("The username has already been taken."),
  check("password")
    .isLength({
      min: 8
    })
    .withMessage("The password must be at least 8 characters."),
  check("confirm")
    .custom((value, { req }) => {
      return value == req.body.confirm;
    })
    .withMessage("The password does not match the confirmation."),
  check("agreement")
    .equals("on")
    .withMessage("You must agree to JainsBret user's agreement.")
];

exports.registerPost = function(req, res, next) {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.render("register", { errors: errors.array() });
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
        res.redirect(req.baseUrl + "/login");
      })
      .catch(error => {
        throw new Error(error);
      });
  }
};

exports.loginGet = function(req, res) {
  if (req.user) {
    res.redirect("/");
  }
  res.render("login");
};

exports.loginPost = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("login", { failed: true });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

exports.resetPasswordGet = function(req, res) {
  res.render("resetPassword");
};

exports.resetPasswordPost = function(req, res) {
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
};