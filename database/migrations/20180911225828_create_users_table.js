exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.string("username").primary();
    table.string("password").notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("now()"));
    table.string("email").notNullable();
    table.boolean("email_verified").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
