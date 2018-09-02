const tableName = "user";

exports.up = knex => {
    knex.schema.createTable(tableName, table => {
        table.incremets("id").primary();
        table.string("name", 255);
        table.string("name", 255);
        table.string("phone", 16);
    });
};

exports.down = knex => {
    knex.schema.dropTable(tableName);
};
