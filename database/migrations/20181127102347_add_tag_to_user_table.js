
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table =>{
      table.string('tags');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', table =>{
      table.dropColumn('tags');
    })
  ])
};
