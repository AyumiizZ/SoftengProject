
exports.up = function(knex, Promise) {
  return knex.schema.createTable("jobs_interests", table => {
    table.integer("job_id");
    table.integer("user_id");
    table.text("message");
    table.primary(["job_id", "user_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("freelance_interests");
};