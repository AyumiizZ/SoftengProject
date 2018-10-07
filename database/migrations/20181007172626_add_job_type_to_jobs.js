
exports.up = function(knex, Promise) {
    return knex.schema.table("jobs", table => {
        table.string("job_type").notNullable;
        table.string("tag");
    });
};

exports.down = function(knex, Promise) {
  
};
