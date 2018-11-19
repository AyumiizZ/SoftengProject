
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs",table => {
      table.boolean("fixed").default(false)
      table.boolean("hourly").default(false)
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
