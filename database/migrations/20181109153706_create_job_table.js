exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("jobs", table => {
      table.increments("id").primary();
      table.string("job");
      table.string("job_info");
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.boolean("done").defaultTo(false);
      table.integer("client_id");
      table.integer("user_id");
      table.string("job_type");
      table.string("tag");
      table.integer("price");
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("jobs");
};
