import * as Knex from 'knex';
import * as dotenv from "dotenv";

dotenv.config();

export default Knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    debug: false,
    charset: "utf8"
  }
});
