exports.up = function(knex, Promise) {
  return knex.schema.table("users", table => {
    table.string("name").notNullable;
    table.string("overview");
    table.string("past_job");
    table.string("client_review");
  });
};

exports.down = function(knex, Promise) {};
