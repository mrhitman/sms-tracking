"use strict";

const Knex = require("knex");
require("dotenv").config();

module.exports = Knex({
  client: "postgres",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    debug: false
  },
  pool: {
    min: process.env.DB_MIN_CONNECTIONS || 24,
    max: process.env.DB_MAX_CONNECTIONS || 48
  }
});
