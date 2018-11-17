require("dotenv").config();

const config = require("../knexfile.js")[process.env.DATABASE || "sqlite"];
module.exports = require("knex")(config);
