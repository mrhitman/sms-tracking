const tableName = "sms_template";

exports.up = knex =>
  knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.string("template");
    table.string("description");
    table.integer("user_id").unsigned();

    table
      .foreign("user_id")
      .references("id")
      .inTable("user");
  });

exports.down = knex => knex.schema.dropTable(tableName);
