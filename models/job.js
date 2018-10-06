const { Model } = require("objection");
const knex = require("../database/knex.js");

Model.knex(knex);

class Job extends Model {
  static get tableName() {
    return "jobs";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "client_id"
        },
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "user_id"
        }
      }
    }
  }
}

module.exports = Job;
