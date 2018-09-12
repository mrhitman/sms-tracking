const tableName = "refresh_token";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.string("token").primary();
    table.integer("user_id").unsigned();
    table.bigint("created_at");

    table
      .foreign("user_id")
      .references("id")
      .inTable("user");
  });

exports.down = knex => knex.schema.dropTable(tableName);
