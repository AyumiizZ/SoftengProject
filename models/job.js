const { Model } = require("objection");
const knex = require("../database/knex.js");
const User = require("./user.js");

Model.knex(knex);

class Job extends Model {
  static get tableName() {
    return "jobs";
  }

  static get relationMappings() {
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "jobs.client_id"
        }
      },
      freelance_interests: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "jobs.id",
          through: {
            from: "jobs_interests.job_id",
            to: "jobs_interests.user_username"
          },
          to: "users.username"
        }
      },
      freelance: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "jobs.user_id"
        }
      }
    };
  }
}

module.exports = Job;
