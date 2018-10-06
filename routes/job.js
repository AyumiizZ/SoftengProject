var express = require("express");
var router = express.Router();
var jobsController = require("../controllers/jobsController");

const Job = require("../models/job");

router.get("/", function(req, res) {
  // Showing all available jobs, not available at this time.
});

router.get("/view/:jobId", jobsController.view);
router.get("/interested/:jobId", jobsController.interestedGet);

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
