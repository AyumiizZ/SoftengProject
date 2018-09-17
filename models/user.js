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

  static get secureFields() {
    return ["password"];
  }

  static formatJson(json, options) {
    json = super.formatJson(json, options);
    json = _.omit(json, this.$secureFields);
    return json;
  }
}

module.exports = User;
