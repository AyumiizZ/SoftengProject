const User = require("../models/user");
const gravatar = require("gravatar");

exports.viewProfile = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first()
    .eager("review");
  user.gravatar_url = gravatar.url(user.email, { s: 400 });
  const title = req.params.username + "'s Profile | JetFree by JainsBret";
  res.render("profile", {
    title: title,
    user: user
  });
};