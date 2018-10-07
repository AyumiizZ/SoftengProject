const User = require("../models/user");

exports.loginPost = async function(req, res, next) {
  if (req.body.username || req.query.username) {
    if (req.body.username) {
      var username = req.body.username;
    } else {
      var username = req.query.username;
    }
    var status = { username: username };
    const user = await User.query()
      .where("username", username)
      .first();
    if (user) {
      status.inuse = true;
    } else {
      status.inuse = false;
    }
    res.json(status);
  } else {
    res.json({
      username: null,
      inuse: false
    });
  }
};
