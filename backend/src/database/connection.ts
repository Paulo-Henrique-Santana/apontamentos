import { Sequelize } from "sequelize-typescript";
import dbConfig from "../config/database";

const sequelize = new Sequelize(dbConfig);

sequelize.sync({ alter: true });
sequelize.authenticate();

export default sequelize;