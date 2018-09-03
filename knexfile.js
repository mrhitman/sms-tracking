require("dotenv").config();

module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: `./${process.env.DB_FILENAME}`
  },
  migrations: {
    tableName: "migration"
  }
};
