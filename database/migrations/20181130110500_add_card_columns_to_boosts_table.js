exports.up = function(knex, Promise) {
  return knex.schema.table("jobs_boosts", table => {
    table.string("card_number").nullable();
    table.string("card_issuer").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("jobs_boosts", table => {
    table.dropColumn("card_number");
    table.dropColumn("card_issuer");
  });
};
