const tableName = "user";
exports.up = knex =>
  knex.schema.alterTable(tableName, table => {
    table
      .double("amount")
      .unsigned()
      .default(0);
  });

exports.down = knex =>
  knex.schema.alterTable(tableName, tableName => {
    table.dropColumn("amount");
  });
