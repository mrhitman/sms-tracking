const tableName = "refresh_token";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.string("token").primary();
    table.integer("user_id");
    table.datetime("created_at");
  });

exports.down = knex => knex.schema.dropTable(tableName);
