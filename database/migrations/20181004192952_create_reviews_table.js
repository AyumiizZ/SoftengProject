exports.up = function(knex, Promise) {
  return knex.schema.createTable("reviews", table => {
    table.increments("id").primary();
    table
      .timestamp("post")
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string("review");
    table.integer("reviewer_id").notNullable();
    table.integer("user_id").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("reviews");
};
