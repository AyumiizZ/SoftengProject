
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs",table => {
      table.integer("fixed").default(0)
      table.integer("hourly").default(0)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", table => {
      table.dropColumn("fixed")
      table.dropColumn("hourly")
    })
  ])
};
