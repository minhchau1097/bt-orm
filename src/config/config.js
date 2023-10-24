// biến môi trường enviroment
// process.env
// yarn add dotenv thư viện sử dụng biến môi trường
import dotenv from 'dotenv'

dotenv.config();




export default {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    pass: process.env.DB_PASS,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
}