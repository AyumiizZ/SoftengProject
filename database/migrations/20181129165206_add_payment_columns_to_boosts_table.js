exports.up = function(knex, Promise) {
  return knex.schema.table("jobs_boosts", table => {
    table.boolean("payment_success").nullable();
    table.string("omise_id").nullable();
    table.string("omise_transaction").nullable();
    table.dateTime("paid_at").nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table("jobs_boosts", table => {
    table.dropColumn("payment_success");
    table.dropColumn("omise_id");
    table.dropColumn("omise_transaction");
    table.dropColumn("paid_at");
  });
};
