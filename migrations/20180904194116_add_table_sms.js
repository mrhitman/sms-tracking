const tableName = "sms";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.integer("order_id").unsigned();
    table.enum("status", ["sent", "not_reached", "in_progress"]);
    table.integer("sms_template_id").unsigned();
    table.bigint("send_time");
    table.text("sms_raw");
  });

exports.down = knex => knex.schema.dropTable(tableName);
