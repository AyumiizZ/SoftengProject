const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const User = require("../models/user");
const passport = require("passport");
const _helpers = require("../auth/_helpers");
var authMiddleware = require("../middlewares/authMiddleware");
var settingsController = require("../controllers/settingsController");

router.use(expressValidator());
router.use(authMiddleware.isAuthenticated);

router.get("/", settingsController.settingsRedirect);

router.get("/profile", settingsController.profileGet);
router.post("/profile", settingsController.profilePost);

router.get("/account", settingsController.accountGet);
router.post("/account", settingsController.accountPost);

router.get("/password", settingsController.passwordGet);
router.post("/password", settingsController.passwordPost);

/*=======
router.get("/profile", async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  res.render("profile", { user: user });
});

router.get("/profile/edit", async function(req, res) {
  let user = await User.query()
    .where("username", req.user.username)
    .first();
  res.render("editProfile", { user: user });
});

router.post("/profile/edit", function(req, res, next) {
  res.redirect("/users/profile");
});

router.get("/profile/:username", async function(req, res) {
  let user = await User.query()
    .where("username", req.params.username)
    .first();
  res.render("profile", { user: user });
});*/

module.exports = router;
