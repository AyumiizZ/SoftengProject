exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
      table.increments("id").primary();
      table
        .timestamp("post")
        .notNullable()
        .defaultTo(knex.raw("NOW"));
      table.string("review");
      table
        .integer("reviewer_id")
        .references("users.id");
      table
        .integer("user_id")
        .references("users.id");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("reviews");
};
