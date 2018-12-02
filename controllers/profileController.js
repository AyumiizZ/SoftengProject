const User = require("../models/user");
const Job = require("../models/job");
const Review = require("../models/review");
const gravatar = require("gravatar");

exports.viewProfile = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first();

  const title = req.params.username + "'s Profile | JetFree by JainsBret";
  res.render("profile/profile", {
    title: title,
    current: req.user,
    user: user
  });
};

exports.viewReviews = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first()
    .eager("[review, review.reviewer]");
  
  console.log(user);
  const totalReview = user.review;
  const amount = totalReview.length;
  var avg = 0;
  for(var i = 0; i < amount; i++) {
    avg += totalReview[i].rate;
  }
  if(amount > 0) {
    avg = avg/amount; 
  }
  const per_page = 5;
  const page = Number(req.params.page);
  var reviews = totalReview.slice(per_page * (page - 1), page * per_page);
  console.log(reviews);
  
  const title = req.params.username + "'s Profile | JetFree by JainsBret";
  res.render("profile/reviews", {
    title: title,
    current: req.user,
    user: user,
    reviews: reviews,
    totalRate: avg,
    page: page,
    n: 1,
    amount: amount,
    limit: Math.ceil(amount / per_page)
  });
};

exports.viewPastJobs = async function(req, res) {
  const user = await User.query()
    .where("username", req.params.username)
    .first();

  var past_job = await Job.query()
    .where("user_id", user.id)
    .where("done", 1);

  const amount = past_job.length;
  const per_page = 5;
  const page = Number(req.params.page);
  var jobs = past_job.slice(per_page * (page - 1), page * per_page);
  console.log(jobs);

  const title = req.params.username + "'s Past Jobs | JetFree by JainsBret";
  user.gravatar_url = gravatar.url(user.email, { s: 400 });

  res.render("profile/pastJobs", {
    user: user,
    past_job: jobs,
    current: req.user,
    title: title,
    page: page,
    n: 1,
    amount: amount,
    limit: Math.ceil(amount / per_page)
  });
};

exports.redirectToUserProfile = function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/" + req.user.username);
};
