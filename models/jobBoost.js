const { Model } = require("objection");
const knex = require("../database/knex.js");
const Job = require("./job.js");
const moment = require("moment");

Model.knex(knex);

class JobBoost extends Model {
  static get tableName() {
    return "jobs_boosts";
  }

  get duration() {
    return parseInt((this.end - this.start) / (1000 * 60 * 60 * 24));
  }

  get formatted_date() {
    const format_string = "DD/MM/YYYY";
    return [
      moment(this.start).format(format_string),
      moment(this.end).format(format_string)
    ];
  }

  get total_price() {
    return this.duration * this.price;
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = JobBoost;
