require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var flash = require("flash");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var searchRouter = require("./routes/search");

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

app.get("*", function(req, res, next) {
  console.log(req.user);
  // put user into res.locals for easy access from templates
  res.locals.user = req.user || null;
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/search", searchRouter);

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
  res.render("error");
});

module.exports = app;
