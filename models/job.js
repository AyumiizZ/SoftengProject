const { Model } = require("objection");
const knex = require("../database/knex.js");
const JobTag = require("./jobTag.js");
const JobBoost = require("./jobBoost.js");
const User = require("./user.js");
const showdownParse = require("../lib/showdownParse");

Model.knex(knex);

class Job extends Model {
  static get tableName() {
    return "jobs";
  }

  job_info_md() {
    return showdownParse(this.job_info);
  }

  tags_array() {
    var res = [];
    this.tags.forEach(function(item, index) {
      res.push(item.tag);
    });
    return res;
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
            to: "jobs_interests.user_id"
          },
          to: "users.id"
        }
      },
      freelance: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "jobs.user_id"
        }
      },
      tags: {
        relation: Model.HasManyRelation,
        modelClass: JobTag,
        join: {
          from: "jobs.id",
          to: "jobs_tags.job_id"
        }
      },
      boosts: {
        relation: Model.HasManyRelation,
        modelClass: JobBoost,
        join: {
          from: "jobs.id",
          to: "jobs_boosts.job_id"
        }
      }
    };
  }
}

module.exports = Job;
