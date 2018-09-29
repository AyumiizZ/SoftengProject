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

  $formatJson(json, options) {
    try {
      json = super.$formatJson(json, options);
      return super.$omit(json, "password");
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

module.exports = User;
