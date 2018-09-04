const tableName = "sms_template";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.string("template");
    table.integer("user_id");
  });

exports.down = knex => knex.schema.dropTable(tableName);
