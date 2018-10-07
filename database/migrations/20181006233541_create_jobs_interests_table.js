exports.up = function(knex, Promise) {
  return knex.schema.createTable("freelance_interests", table => {
    table.int("job_id");
    table.int("user_id");
    table.text("message");
    table.primary(["job_id", "user_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("freelance_interests");
};
