const tableName = "order_history";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.string("status");
    table.integer("order_id").unsigned();
    table.integer("user_id").unsigned();
    table.text("data");
  });

exports.down = knex => knex.schema.dropTable(tableName);
