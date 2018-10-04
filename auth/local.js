const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const authHelpers = require("./_helpers");
const options = {
  usernameField: "username",
  passwordFiend: "password"
};

module.exports = function(passport) {
  passport.use(
    new LocalStrategy(options, (username, password, done) => {
      User.query()
        .where("username", username)
        .first()
        .then(user => {
          if (!user) return done(null, false);
          if (!authHelpers.comparePassSync(password, user.password)) {
            return done(null, false);
          } else {
            return done(null, user);
          }
        })
        .catch(err => {
          return done(err);
        });
    })
  );
};
