<<<<<<< HEAD
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments("id");
    table
      .string("username")
      .notNullable()
      .unique();
    table.string("password").notNullable();
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo(knex.raw("NOW"));
    table.string("email").notNullable();
    table.boolean("email_verified").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
=======
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
>>>>>>> fe11b50345c295d1ac3285ba607b5e25564edbbc
