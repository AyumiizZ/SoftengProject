const { Model } = require("objection");
const knex = require("../database/knex.js");
const Job = require("./job.js");

Model.knex(knex);

class Job extends Model {
  static get tableName() {
    return "jobs";
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.HasManyRelation,
        modelClass: Job,
        join: {
          from: "jobs.id",
          to: "tags.job_id"
        }
      }
    };
  }
}

module.exports = Job;
