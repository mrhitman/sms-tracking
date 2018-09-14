const tableName = "sms_template";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.string("template");
    table.string("description");
    table.integer("user_id").unsigned();
  });

exports.down = knex => knex.schema.dropTable(tableName);
