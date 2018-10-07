const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const apiController = require("../controllers/apiController");

router.use(expressValidator());

router.get("/register/username_check", apiController.loginPost);
router.post("/register/username_check", apiController.loginPost);

module.exports = router;
