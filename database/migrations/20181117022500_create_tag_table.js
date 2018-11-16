
exports.up = function(knex, Promise) {
  return knex.schema.createTable("tags", table => {
    table.increments("id").primary;
    table.string("tag");
    table
    .integer("job_id")
    .references("job_id")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("tags")
};
