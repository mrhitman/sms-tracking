const tableName = "config";

exports.up = knex => knex.schema.createTable(tableName, table => {
    table.increments("id").primary();
    table.string("name");
    table.string("value");
});

exports.down = knex => knex.schema.dropTable(tableName);