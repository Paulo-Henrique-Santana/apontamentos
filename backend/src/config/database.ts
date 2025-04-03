import { env } from "process";
import { Dialect } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";

const dbConfig: SequelizeOptions = {
  dialect: env.DB_DIALECT as Dialect,
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  logging: false,
  models: [__dirname + "/../models"],
  define: {
    timestamps: true,
  }
}

export default dbConfig;