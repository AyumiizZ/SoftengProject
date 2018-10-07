exports.up = function(knex, Promise) {
  return knex.schema.renameTable("freelance_interests", "jobs_interests");
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable("jobs_interests", "freelance_interests");
};
