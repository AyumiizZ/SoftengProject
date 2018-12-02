
exports.up = function(knex, Promise) {
    return knex.schema.table("reviews", table => {
        table.float("rate");
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table("reviews", table => {
        table.dropColumn("rate");
    });
};
