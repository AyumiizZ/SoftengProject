const { Model } = require("objection");
const knex = require("../database/knex.js");
const User = require("./user.js");
const Job = require("./job.js");

Model.knex(knex);

class JobInterest extends Model {
  static get tableName() {
    return "jobs_interests";
  }
  static get idColumn() {
    return ["job_id", "user_id"];
  }

  static get relationMappings() {
    return {
      freelance: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "jobs_interests.user_id"
        }
      },
      job: {
        relation: Model.BelongsToOneRelation,
        modelClass: Job,
        join: {
          from: "jobs.id",
          to: "jobs_interests.job_id"
        }
      }
    };
  }
}

module.exports = JobInterest;
