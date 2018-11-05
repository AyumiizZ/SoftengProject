exports.up = function(knex, Promise) {
    return knex.schema.dropTable("jobs");
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("jobs");
};
