
exports.up = function(knex, Promise) {
    return knex.schema.table("users", table => {
    table.dropColumn("user_img");
  });
};

exports.down = function(knex, Promise) {};
