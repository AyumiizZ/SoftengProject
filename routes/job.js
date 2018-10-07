var express = require("express");
var router = express.Router();
var jobsController = require("../controllers/jobsController");
var authMiddleware = require("../middlewares/authMiddleware");

const Job = require("../models/job");

router.get("/", function(req, res) {
  // Showing all available jobs, not available at this time.
});

router.get("/view/:jobId", jobsController.view);
router.get(
  "/interested/:jobId",
  authMiddleware.isAuthenticated,
  jobsController.interestedGet
);
router.post(
  "/interested/:jobId",
  authMiddleware.isAuthenticated,
  jobsController.interestedPost
);
router.get(
  "/view/:jobId/interests",
  authMiddleware.isAuthenticated,
  jobsController.showInterests
);

router.get("/add", function(req, res) {
  res.render("addjob",{title:'Add job | JetFree by JainsBret'});
});

router.post("/add", jobsController.addPost);

module.exports = router;
