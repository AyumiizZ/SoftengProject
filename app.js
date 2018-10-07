require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var flash = require("flash");
var expressValidator = require("express-validator");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var jobRouter = require("./routes/job");
var profileRouter = require("./routes/profile");
var searchRouter = require("./routes/search");
var settingsRouter = require("./routes/settings");
var apiRouter = require("./routes/api");
var jobRouter = require("./routes/job");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret:
      process.env.SECRET_KEY ||
      "\xd3\xae\x07z\xbd\xfb\xea\xa74\xc3g\x1bt,y\xe8?\xfb\xe0\x85\x0f'\x83\x8c",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./auth/passport")(passport);
require("./auth/local")(passport);

app.use(flash());
app.use(express.static(path.join(__dirname, "..", "..", "client")));

app.use("*", function(req, res, next) {
  // put user into res.locals for easy access from templates
  res.locals.user = req.user || null;
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);
app.use("/api", apiRouter);
app.use("/jobs", jobRouter);
app.use("/profile", profileRouter);
app.use("/search", searchRouter);
app.use("/settings", settingsRouter);
app.use("/jobs", jobRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  let title = 'Sorry 404 Not Found | JetFree by JainsBret'
  res.render("error",{title:title});
});

module.exports = app;
