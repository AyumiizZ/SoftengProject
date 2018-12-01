var express = require("express");
var router = express.Router();
var jobsController = require("../controllers/jobsController");
var authMiddleware = require("../middlewares/authMiddleware");

const Job = require("../models/job");

router.get("/", jobsController.redirectToBrowse);
router.get("/browse", jobsController.browseGet);
router.post("/browse", jobsController.browsePost);

router.get("/view/:jobId", jobsController.view);

router.get(
  "/edit/:jobId",
  authMiddleware.isAuthenticated,
  jobsController.editGet
);
router.post(
  "/edit/:jobId",
  authMiddleware.isAuthenticated,
  jobsController.editPost
);

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
  jobsController.showInterestsGet
);
router.post(
  "/view/:jobId/interests",
  authMiddleware.isAuthenticated,
  jobsController.showInterestsPost
);

router.get(
  "/current/freelance",
  authMiddleware.isAuthenticated,
  jobsController.freelanceJobsGet
);

router.get(
  "/current/client",
  authMiddleware.isAuthenticated,
  jobsController.clientJobsGet
);

router.get(
  "/current/freelance/:jobId/finished",
  authMiddleware.isAuthenticated,
  jobsController.reviewGet
);

router.get(
  "/current/client/:jobId/finished",
  authMiddleware.isAuthenticated,
  jobsController.reviewGet
);

router.get("/add", authMiddleware.isAuthenticated, jobsController.addGet);
router.post("/add", authMiddleware.isAuthenticated, jobsController.addPost);

router.get(
  "/boost/:jobId",
  authMiddleware.isAuthenticated,
  jobsController.boostList
);

router.get(
  "/boost/:jobId/add",
  authMiddleware.isAuthenticated,
  jobsController.boostGet
);
router.post(
  "/boost/:jobId/add",
  authMiddleware.isAuthenticated,
  jobsController.boostPost
);

router.get(
  "/boost/:jobId/:boostId/pay",
  authMiddleware.isAuthenticated,
  jobsController.payBoostGet
);
router.post(
  "/boost/:jobId/:boostId/pay",
  authMiddleware.isAuthenticated,
  jobsController.payBoostPost
);

module.exports = router;
