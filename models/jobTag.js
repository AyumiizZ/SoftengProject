const { Model } = require("objection");
const knex = require("../database/knex.js");
const Job = require("./job.js");
const showdownParse = require("../lib/showdownParse");

Model.knex(knex);

class JobTag extends Model {
  static get tableName() {
    return "jobs_tags";
  }

  static get relationMappings() {
    return {
      job_tag: {
        relation: Model.BelongToOneRelation,
        modelClass: "jobs",
        join: {
          from: "jobs.id",
          to: "jobs_tags.job_id"
        }
      }
    };
  }
}

module.exports = JobTag;
