const { Model } = require("objection");
const knex = require("../database/knex.js");

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Review = require("./review.js");
    return {
      review: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "users.id",
          to: "reviews.user_id"
        }
      }
    };
  }
}

module.exports = User;
