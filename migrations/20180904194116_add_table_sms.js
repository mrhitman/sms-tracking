const tableName = "sms";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.integer("order_id").unsigned();
    table.enum("status", ["sent", "not_reached", "in_progress"]);
    table.integer("sms_template_id").unsigned();
    table.bigint("send_time");
    table.text("sms_raw");

    table.foreign("order_id").references("id").inTable("order");
    table.foreign("sms_template_id").references("id").inTable("sms_template");
  });

exports.down = knex => knex.schema.dropTable(tableName);
