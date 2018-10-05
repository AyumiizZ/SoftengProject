var express = require("express");
var router = express.Router();

const Job = require("../models/job");

router.get("/add", function(req, res) {
  res.render("addjob");
});

router.post("/add", function(req, res, next) {
  console.log(Job);
  console.log(req.body);
  res.redirect("/");
  return Job.query().insert(req.body);
});

module.exports = router;
