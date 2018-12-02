exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("jobs_status", table => {
      table.integer("id").primary();
      table.boolean('client_review').defaultTo(false);
      table.boolean('freelance_review').defaultTo(false);
      table.boolean('client_submit').defaultTo(false);
      table.boolean('freelance_submit').defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("jobs_status");
};
