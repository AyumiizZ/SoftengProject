exports.up = function(knex, Promise) {
  return knex.schema.alterTable("jobs", table => {
    table.text("job_info").alter();
  });
};

exports.down = function(knex, Promise) {};
