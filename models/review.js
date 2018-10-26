const { Model } = require("objection");
const knex = require("../database/knex.js");

Model.knex(knex);

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get relationMappings() {
    const User = require("./user.js");
    return {
      reviewer: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          to: "reviews.reviewer_id",
          from: "users.id"
        }
      }
    };
  }
}

module.exports = Review;
