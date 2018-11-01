var express = require("express");
var router = express.Router();
var jobsController = require("../controllers/jobsController");
var authMiddleware = require("../middlewares/authMiddleware");

const Job = require("../models/job");

router.get("/", function(req, res) {
  // Showing all available jobs, not available at this time.
});

router.get("/view/:jobId", jobsController.view);
router.get("/edit/:jobId", jobsController.editGet);
router.post("/edit/:jobId", jobsController.editPost);

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

router.get("/add", authMiddleware.isAuthenticated, function(req, res) {
  let title = "Add job | JetFree by JainsBret";
  res.render("jobs/addedit", {
    title: title,
    h1_title: "ลงประกาศงาน"
  });
});

router.post("/add", authMiddleware.isAuthenticated, jobsController.addPost);

module.exports = router;
