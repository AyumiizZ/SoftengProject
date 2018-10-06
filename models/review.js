const { Model } = require("objection");
const knex = require("../database/knex.js");
const User = require("./user.js");

Model.knex(knex);

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.user_id",
          to: "reviewer_id"
        },
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.user_id",
          to: "user_id"
        }
      }
    };
  }
}

module.exports = Review;
