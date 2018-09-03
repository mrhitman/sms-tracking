const Knex = require("knex");
require("dotenv").config();

module.exports = Knex({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: `./${process.env.DB_FILENAME}`
  },
  pool: { min: 12, max: 24 }
});
