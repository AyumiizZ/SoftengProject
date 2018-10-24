const User = require("../models/user");

exports.viewProfile = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first()
    .eager("review");
  const title = req.params.username + "'s Profile | JetFree by JainsBret";
  res.json(user);
  /*
  res.render("profile", {
    title: title,
    user: user
  });
  */
};
