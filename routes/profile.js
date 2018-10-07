const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const User = require("../models/user");
const Review = require("../models/review");

router.use(expressValidator());

router.get("/", function(req, res) {
  if (!req.user) {
    res.redirect("/");
  }
  res.redirect(req.baseUrl + "/" + req.user.username);
});

router.get("/:username", async function(req, res) {
  let user = await User.query()
    .where("username", req.params.username)
    .first();
  console.log(user);
  let reviews = await Review.query().where("user_id", user.id);
  let reviewers = [];
  for (review in reviews) {
    reviewers.push(
      await User.query()
        .where("id", user.id)
        .first()
    );
  }
  let authen = await (user.username == req.user.username);
  res.render("profile", { user: user, reviews: reviews, reviewers: reviewers, authen: authen });
});

module.exports = router;
