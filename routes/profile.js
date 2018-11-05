const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const User = require("../models/user");
const Review = require("../models/review");
const profileController = require("../controllers/profileController");

router.use(expressValidator());

router.get("/", profileController.redirectToUserProfile);
router.get("/:username", profileController.viewProfile);
router.get("/:username/jobs", profileController.viewPastJobs);
router.get("/:username/reviews", profileController.viewReviews);

module.exports = router;
