exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", table => {
      table.dropColumn("tag");
    }),
    knex.schema.createTable("jobs_tags", table => {
      table.integer("job_id");
      table.string("tag");
      table.primary(["job_id", "tag"]);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("jobs_tags"),
    knex.schema.table("jobs", table => {
      table.string("tag");
    })
  ]);
};
