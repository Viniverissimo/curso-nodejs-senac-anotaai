import { Sequelize } from 'sequelize';

import "dotenv/config.js"

const dbName = process.env.DB_name
const dbUser = process.env.DB_user
const dbPassword = process.env.DB_password
const dbHost = process.env.DB_host
const dbPort = process.env.Port_DB

const sequelize = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
        dialect: "mysql",
        host: dbHost,
        port: dbPort
    }
);

// sequelize.query("SELECT * FROM tb_anotacao")
//     .then(([resultados]) => {
//         console.log(resultados);
//     })
//     .catch((error) => {
//         console.log("erro na colsuta" + error);
//     })

export default sequelize;