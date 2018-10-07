const { check, validationResult } = require("express-validator/check");
const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const authController = require("../controllers/authController");

router.use(expressValidator());

router.get("/register", authController.registerGet);
router.post(
  "/register",
  authController.registerPostCheck,
  authController.registerPost
);
router.get("/login", authController.loginGet);
router.post("/login", authController.loginPost);
router.get("/logout", authController.logout);
router.post("/logout", authController.logout);
router.get("/resetPassword", authController.resetPasswordGet);
router.post("/resetPassword", authController.resetPasswordPost);

module.exports = router;
