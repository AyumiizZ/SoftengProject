const bcrypt = require("bcryptjs");

function comparePass(userPassword, databasePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(userPassword, databasePassword).then(result => {
      resolve(result);
    });
  });
}

function comparePassSync(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function hashPass(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10).then(hashed => {
      resolve(hashed);
    });
  });
}

module.exports = {
  comparePass,
  hashPass
};
