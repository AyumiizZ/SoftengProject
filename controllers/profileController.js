const User = require("../models/user");
const gravatar = require("gravatar");
var md = require("markdown-it")();

exports.viewProfile = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first()
    .eager("review");
  user.overview = md.render(user.overview);
  const title = req.params.username + "'s Profile | JetFree by JainsBret";
  res.render("profile/profile", {
    title: title,
    user: user
  });
};

exports.redirectToUserProfile = function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/" + req.user.username);
};
