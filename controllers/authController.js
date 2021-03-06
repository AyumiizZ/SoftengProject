const { check, validationResult } = require("express-validator/check");
const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const passport = require("passport");

exports.registerGet = function(req, res) {
  let title = "Register | JetFree by JainsBret";
  console.log(process.env.RECAPTCHA_KEY);
  res.render("auth/register", {
    title: title,
    recaptchaKey: process.env.RECAPTCHA_KEY
  });
};

exports.registerPostCheck = [
  check("email")
    .isEmail()
    .withMessage("E-mail is not in a valid format.")
    .custom(async function(value) {
      const u = await User.query().where("email", value);
      if (u.length > 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("The E-mail is already in use"),
  check("username")
    .isLength({
      min: 1
    })
    .withMessage("Username must not be empty.")
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
      return value == req.body.password;
    })
    .withMessage("The password does not match the confirmation."),
  check("agreement")
    .equals("on")
    .withMessage("You must agree to JainsBret user's agreement.")
  
];

exports.registerPost = function(req, res, next) {
  const errors = validationResult(req);
  let title = "Register | JetFree by JainsBret";
  console.log(errors);
  if (!errors.isEmpty()) {
    res.render("auth/register", {
      title: title,
      errors: errors.array()
    });
  } else {
    _helpers
      .hashPass(req.body.password)
      .then(hashed => {
        console.log(req.body);
        req.body.password = hashed;
        const userJson = req.body;
        delete userJson.confirm;
        delete userJson.agreement;
        delete userJson["g-recaptcha-response"];
        return User.query().insert(userJson);
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
  let title = "Login | JetFree by JainsBret";
  if (req.user) {
    res.redirect("/");
  }
  res.render("auth/login", {
    title: title
  });
};

exports.loginPost = function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    let title = "Login | JetFree by JainsBret";
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("auth/login", {
        title: title,
        failed: true
      });
    }
    req.logIn(user, function(err) {
      console.log(req.query.redirect);
      if (err) {
        return next(err);
      }
      if (req.query.redirect == undefined) {
        return res.redirect("/");
      }
      return res.redirect(req.query.redirect);
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect("/");
};

exports.resetPasswordGet = function(req, res) {
  let title = "Reset Password | JetFree by JainsBret";
  res.render("auth/resetPassword", {
    title: title
  });
};

exports.resetPasswordPost = function(req, res) {
  const username = req.body.username;
  const answer = req.body.answer.toLowerCase();
  let title = "Register | JetFree by JainsBret";

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
  res.render("auth/resetPassword", {
    title: title
  });
};
