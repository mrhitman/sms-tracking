"use strict";

const Knex = require("knex");
require("dotenv").config();

module.exports = Knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: `./${process.env.DB_FILENAME}`
  },
  pool: { min: 24, max: 48 }
});
