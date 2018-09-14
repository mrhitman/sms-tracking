const tableName = "order";

exports.up = knex =>
  knex.schema.alterTable(tableName, table => {
    table.integer("on_send_sms_template_id").unsigned();
    table.renameColumn("sms_template_id", "remind_sms_template_id");
  });

exports.down = knex =>
  knex.schema.alterTable(tableName, table => {
    table.dropColumn("on_send_sms_template_id");
    table.renameColumn("sms_template_id", "remind_sms_template_id");
  });
