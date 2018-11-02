
exports.up = function(knex, Promise) {
    return knex.schema.table("jobs", table => {
        table.integer("price")
    });
};

exports.down = function(knex, Promise) {
  
};
