const tableName = "order";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.integer("user_id").unsigned();
    table.enum("type", ["novaposhta"]);
    table.enum("status", [
      "pending",
      "in_progress",
      "paused",
      "done",
      "refused"
    ]);
    table.string("ttn");
    table.unique(['ttn', 'type']);
    table.integer("sms_template_id").unsigned();
    table.string("phone");
    table.bigint("last_sms_sent");
    table.bigint("created_at");

    table.foreign("user_id").references("id").inTable("user");
    table.foreign("sms_template_id").references("id").inTable("sms_template");
  });

exports.down = knex => knex.schema.dropTable(tableName);