exports.up = function(knex, Promise) {
  return knex.schema.table("users", table => {
    table.string("name").notNullable;
    table.string("overview");
    table.string("pastjob");
    table.string("review");
  });
};

exports.down = function(knex, Promise) {};
