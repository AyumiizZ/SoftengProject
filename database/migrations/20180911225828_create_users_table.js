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
    table.string("overview");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
