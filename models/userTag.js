const { Model } = require("objection");
const knex = require("../database/knex.js");

const showdownParse = require("../lib/showdownParse");

Model.knex(knex);

class UserTag extends Model {
  static get tableName() {
    return "users_tags";
  }

  static get relationMappings() {

    const User = require("./user.js");
    return {
      user_tag: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "users_tags.user_id"
        }
      }
    };
  }
}

module.exports = UserTag;
