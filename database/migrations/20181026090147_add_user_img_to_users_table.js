exports.up = function(knex, Promise) {
  return knex.schema.table("users", table => {
    table.blob("user_img").notNullable;
  });
};

exports.down = function(knex, Promise) {};
