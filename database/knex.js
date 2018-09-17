<<<<<<< HEAD
require("dotenv").config();

const config = require("../knexfile.js")[process.env.NODE_ENV || "development"];
module.exports = require("knex")(config);
=======
require("dotenv").config();

const config = require("../knexfile.js")[process.env.NODE_ENV || "development"];
module.exports = require("knex")(config);
>>>>>>> fe11b50345c295d1ac3285ba607b5e25564edbbc
