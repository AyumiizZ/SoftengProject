const { Model } = require("objection");
const knex = require("../database/knex.js");
const User = require("./user.js");
const Job = require("./job.js");

Model.knex(knex);

class JobStatus extends Model {

  static get relationMappings() {
    return {
      freelance: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "jobs_status.id",
          to: "jobs.id"
        }
      }
    };
  }
}

module.exports = JobStatus;
