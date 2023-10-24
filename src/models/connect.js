import { Sequelize } from "sequelize";
import config from "../config/config.js";
const sequelize = new Sequelize(config.database,config.username,config.pass,{
    host:config.host,
    port: config.port,
    dialect: config.dialect
})

export default sequelize;