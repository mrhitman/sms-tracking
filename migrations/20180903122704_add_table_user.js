const tableName = "user";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").unique();
    table.string("password");
    table.string("phone");
    table.integer("reference");
    table.integer("default_sms_template_id");
  });

exports.down = knex => knex.schema.dropTable(tableName);