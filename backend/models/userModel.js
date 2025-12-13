import { stringify } from "querystring";
import sequelize from "../config/db.js";
import { DataTypes } from "sequelize"

const Usuario = sequelize.define(
    "Usuario",
    {
        id_usuario:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome:{
            type: DataTypes.STRING(455),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        data_nasc:{
            type: DataTypes.DATE,
            allowNull: true
        },
        senha:{
            type: DataTypes.STRING(255),
            allowNull: false
        }
    },
    {
        tableName: "tb_usuario",
        timestamps: false
    }
);

export default Usuario;