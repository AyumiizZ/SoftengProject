exports.up = function(knex, Promise) {
  return knex.schema.createTable("jobs_boosts", table => {
    table.increments("id");
    table.integer("job_id");
    table.date("start");
    table.date("end");
    table.integer("price");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("jobs_boosts");
};
