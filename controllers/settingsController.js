exports.settingsRedirect = function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/profile");
};

exports.profileGet = async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  var errors = req.validationErrors();
  let title = "Edit Profile | JetFree by JainsBret";
  res.render("profile/edit", {
    title: title,
    user: user
  });
};

exports.profilePost = async function(req, res, next) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  let updatedUser = await User.query().updateAndFetchById(user.id, req.body);
  res.redirect("/settings/profile");
};

exports.accountGet = async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  var errors = req.validationErrors();
  res.render("editAccount", { user: user });
};
exports.accountPost = async function(req, res, next) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  req.checkBody("username", "Username must not be empty.").notEmpty();
  req.checkBody("email", "E-mail is not in a valid format.").isEmail();

  var errors = req.validationErrors();
  if (errors) {
    console.log("error!");
    res.render("editAccount", { errors: errors, user: user });
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
  res.render("changePassword", { user: user });
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

  console.log(pass);

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
