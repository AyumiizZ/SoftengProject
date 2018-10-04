exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.createTable("past_jobs", table => {
        table.increments("id").primary();
        table.string("job");
        table.string("job_info");
        table.integer("client_id").references("users_id");
        table.integer("user_id").references("users_id");
      })
    ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("past_jobs");
};
