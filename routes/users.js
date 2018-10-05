const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const { sanitizeBody } = require("express-validator/filter");
const bcrypt = require("bcrypt");
const _helpers = require("../auth/_helpers");
const User = require("../models/user");
const passport = require("passport");
const authController = require("../controllers/authController");

router.use(expressValidator());

router.get("/register", authController.registerGet);
router.post("/register", authController.registerPost);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logout);
router.post("/logout", authController.logout);
router.get("/resetPassword", authController.resetPasswordGet);
router.post("/resetPassword", authController.resetPasswordPost);

module.exports = router;
