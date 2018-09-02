const { resolve } = require('path');

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: 'local.db'
  },
  migrations: {
    tableName: 'migration',
  },
};