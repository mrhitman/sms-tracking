const tableName = "payment";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.integer("amount");
    table.integer("user_id");
    table.bigint("created_at");

    table
      .foreign("user_id")
      .references("id")
      .inTable("user");
  });

exports.down = knex => knex.schema.dropTable(tableName);
