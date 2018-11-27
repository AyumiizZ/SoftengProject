
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", table =>{
      table.dropColumn("job_type");
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("jobs", table => {
      table.string("job_type");
    })
  ])
};
