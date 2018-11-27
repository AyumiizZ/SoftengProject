const express = require("express");
const router = express.Router();
const expressValidator = require("express-validator");
const passport = require("passport");
const _helpers = require("../auth/_helpers");
var authMiddleware = require("../middlewares/authMiddleware");
var settingsController = require("../controllers/settingsController");
var csrf = require("csurf");
var csrfProtection = csrf({ cookie: true });

router.use(expressValidator());
router.use(authMiddleware.isAuthenticated);

router.get("/", settingsController.settingsRedirect);

router.get("/profile", csrfProtection, settingsController.profileGet);
router.post("/profile", csrfProtection, settingsController.profilePost);

router.get("/account", csrfProtection, settingsController.accountGet);
router.post(
  "/account", 
//  csrfProtection, 
  settingsController.accountPostCheck, 
  settingsController.accountPost
);

router.get("/password", csrfProtection, settingsController.passwordGet);
router.post("/password", csrfProtection, settingsController.passwordPost);

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
