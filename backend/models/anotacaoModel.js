import { stringify } from "querystring";
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize"

const Anotacao = sequelize.define(
    "Anotacao",
    {
        id_anotacao:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        descricao:{
            type: DataTypes.STRING(455),
            allowNull: true
        }
    }
);