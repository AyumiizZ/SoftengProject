exports.up = function(knex, Promise) {
  return knex.schema.table("users", table => {
    table.string("name").notNullable;
  });
};

exports.down = function(knex, Promise) {};
