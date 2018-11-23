const { Model } = require("objection");
const knex = require("../database/knex.js");
const Job = require("./job.js");

Model.knex(knex);

class JobBoost extends Model {
  static get tableName() {
    return "jobs_boosts";
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = JobBoost;
