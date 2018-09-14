const tableName = "payment";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.integer("amount");
    table.integer("user_id");
    table.bigint("created_at");
  });

exports.down = knex => knex.schema.dropTable(tableName);
