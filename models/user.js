const { Model } = require("objection");
const knex = require("../database/knex.js");
const gravatar = require("gravatar");

Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get virtualAttributes() {
    return ["gravatar_url"];
  }

  gravatar_url(size = 400) {
    return gravatar.url(this.email, { s: size });
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
