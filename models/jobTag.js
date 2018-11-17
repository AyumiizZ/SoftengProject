const { Model } = require("objection");
const knex = require("../database/knex.js");
const showdownParse = require("../lib/showdownParse");

Model.knex(knex);

class JobTag extends Model {
  static get tableName() {
    return "jobs_tags";
  }

  static get relationMappings() {
    const Job = require("./job.js");
    return {
      job_tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: Job,
        join: {
          from: "jobs.id",
          to: "jobs_tags.job_id"
        }
      }
    };
  }
}

module.exports = JobTag;
