const User = require("../models/user");
const gravatar = require("gravatar");
const passport = require("passport");
const _helpers = require("../auth/_helpers");
const { check, validationResult } = require("express-validator/check");

exports.settingsRedirect = function(req, res) {
  res.redirect(req.baseUrl + "/profile");
};

exports.profileGet = async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  user.gravatar_url = gravatar.url(user.email, { s: 400 });
  let title = "Edit Profile | JetFree by JainsBret";
  res.render("profile/editProfile", {
    csrfToken: req.csrfToken(),
    title: title,
    user: user
  });
};

exports.profilePost = async function(req, res, next) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  delete req.body._csrf;
  let updatedUser = await User.query().updateAndFetchById(user.id, req.body);
  res.redirect("/settings/profile");
};

exports.accountGet = async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  res.render("profile/editAccount", { user: user, csrfToken: req.csrfToken() });
};

exports.accountPostCheck = [
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
    check("email")
    .isEmail()
    .withMessage("E-mail is not in a valid format.")
    .custom(async function(value) {
      var u = await User.query().where("email", value);
      if (u.length > 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("The E-mail is already in use")
];

exports.accountPost = async function(req, res, next) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  //  delete req.body._csrf;
/*  req.checkBody("username", "Username must not be empty.").notEmpty();
  req.checkBody("email", "E-mail is not in a valid format.").isEmail();

  var errors = req.validationErrors();*/
  const errors = validationResult(req);
  var err = errors.array();
  if(err.length == 1) {
    let error = err[0];
    let u;
    if(error.param == "username") {
      u = await User.query()
        .where("username", error.value)
        .first();
    }
    else {
      u = await User.query()
        .where("email", error.value)
        .first();
    }
    if(u.id == req.user.id) {
      err.pop();
    }
  }
  else if(err.length == 2) {
    let username = err[0].value;
    let email = err[1].value;

    let u = await User.query()
      .where("username", username)
      .first();
    if(u.id == req.user.id) {
      err.splice(0, 1);
    }

    let x = await User.query()
      .where("email", email)
      .first();
    if(x.id == req.user.id) {
        err.pop();
    }
  }

  if (err && err != 0) {
    console.log("error!");
    res.render("profile/editAccount", { errors: err, user: user });
  } else {
    let updatedUser = await User.query().updateAndFetchById(user.id, req.body);
    res.redirect("/settings/account");
  }
};

exports.passwordGet = async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  var errors = req.validationErrors();
  res.render("profile/changePassword", {
    user: user,
    csrfToken: req.csrfToken()
  });
};

exports.passwordPost = async function(req, res, next) {
  var pass = true;
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  req
    .checkBody("password", "Password must be at least 8 characters.")
    .isLength({ min: 8 });
  req
    .checkBody("confirm", "Password does not match the confirmation")
    .equals(req.body.password);
  pass = _helpers.comparePassSync(req.body.old_password, user.password);
  var errors = req.validationErrors();
  if (errors || !pass) {
    console.log("error!");
    let failed = !pass;
    res.render("changePassword", {
      errors: errors,
      failed: failed,
      user: user
    });
  } else {
    delete req.body._csrf;
    delete req.body.old_password;
    delete req.body.confirm;
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
};
