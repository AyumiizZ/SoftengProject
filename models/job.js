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
