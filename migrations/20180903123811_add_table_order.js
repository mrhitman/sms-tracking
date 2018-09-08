const tableName = "order";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.integer("user_id");
    table.enum("type", ["novaposhta"]);
    table.enum("status", [
      "pending",
      "in_progress",
      "paused",
      "done",
      "refused"
    ]);
    table.string("ttn");
    table.string("sms_template");
    table.string("phone");
    table.timestamp("last_sms_sent");
    table.timestamp("created_at");
  });

exports.down = knex => knex.schema.dropTable(tableName);