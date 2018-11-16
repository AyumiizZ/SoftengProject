const { Model } = require("objection");
const knex = require("../database/knex.js");
const Job = require("./job.js");

Model.knex(knex);

class Tag extends Model {
  static get tableName() {
    return "tags";
  }

  static get relationMappings() {
    return {
      tag: {
        relation: Model.HasOneRelation,
        modelClass: Job,
        join: {
          from: "jobs.id",
          to: "tags.job_id"
        }
      }
    };
  }
}

module.exports = Tag;
