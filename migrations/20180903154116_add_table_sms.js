const tableName = "sms";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.integer("order_id");
    table.enum("status", ["sent", "not_reached", "in_progress"]);
    table.integer("template_id");
    table.datetime("send_time");
  });

exports.down = knex => knex.schema.dropTable(tableName);
