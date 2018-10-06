const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const passport = require("passport");

exports.registerGet = function(req, res) {
  res.render("register");
};

exports.registerPost = function(req, res) {
  req.checkBody("email", "E-mail is not in a valid format.").isEmail();
  req
    .checkBody("email", "The E-mail address is already in use.")
    .custom(value => {
      var user = User.query().where("email", value);
      console.log(user);
      if (user.length > 0) {
        return Promise.reject("The E-mail address is already in use.");
      }
    });
  req
    .checkBody("username", "The username has already been taken.")
    .custom(value => {
      var user = User.query().where("username", value);
      if (user.length > 0) {
        console.log(user);
        return Promise.reject("The username has already been taken.");
      }
    });
  req
    .checkBody("password", "Password must be at least 8 characters.")
    .isLength({ min: 8 });
  req
    .checkBody("confirm", "Password does not match the confirmation")
    .equals(req.body.confirm);
  req
    .checkBody("agreement", "You must agree to JainsBret's user agreement")
    .equals("on");
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