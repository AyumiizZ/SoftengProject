const { Model } = require("objection");
const knex = require("../database/knex.js");

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    return {};
  }
}

module.exports = User;
