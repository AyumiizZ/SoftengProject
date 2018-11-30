const User = require("../models/user");
const Job = require("../models/job");
const gravatar = require("gravatar");

exports.viewProfile = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first();
  const title = req.params.username + "'s Profile | JetFree by JainsBret";
  res.render("profile/profile", {
    title: title,
    user: user
  });
};

exports.viewReviews = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first()
    .eager("review");
  var past_job = await Job.query()
    .where("user_id", user.id)
    .where("done", 1);
  let amount = past_job.length;
  if (past_job.length > 5) {
    past_job = past_job.slice(0, 5);
  }
  const title = req.params.username + "'s Profile | JetFree by JainsBret";
  res.render("profile/reviews", {
    title: title,
    current: req.user,
    user: user,
    past_job: past_job,
    amount: amount
  });
};

exports.viewPastJobs = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first();

  var past_job = await Job.query()
    .where("user_id", user.id)
    .where("done", 1);
  const title = req.params.username + "'s Past Jobs | JetFree by JainsBret";
  user.gravatar_url = gravatar.url(user.email, { s: 400 });

  res.render("profile/pastJobs", {
    user: user,
    past_job: past_job,
    title: title
  });
};

exports.redirectToUserProfile = function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/" + req.user.username);
};
